<template>
	<div>
		<h2 class="mb-4">Form Slider</h2>
		<Nuxt-link to="/slider" class="btn btn-danger mb-3"
			><i class="fa fa-arrow-left"></i> Back</Nuxt-link
		>
		<div class="card mb-4">
			<div class="card-body">
				<div class="form-group">
					<label class="col-md-2" for="name">File Image</label>
					<div class="col-md-6">
						<input
							type="file"
							@change="selectImage"
							name="image"
							id="image"
							accept="image/*"
						/>
						<button
							:disabled="!currentImage"
							class="btn btn-primary"
							@click="upload()"
						>
							Submit
						</button>
					</div>
				</div>
				<div v-if="currentImage" class="progress">
					<div
						class="progress-bar progress-bar-info"
						role="progressbar"
						:aria-valuenow="progress"
						aria-valuemin="0"
						aria-valuemax="100"
						:style="{ width: progress + '%' }"
					>
						{{ progress }}%
					</div>
				</div>

				<div v-if="previewImage">
					<div>
						<img
							class="img-thumbnail my-3"
							width="100%"
							:src="previewImage"
							alt=""
						/>
					</div>
				</div>
			</div>
		</div>
		<v-overlay :value="this.loading">
			<v-progress-circular indeterminate size="64"></v-progress-circular>
		</v-overlay>
	</div>
</template>

<script>
export default {
	data() {
		return {
			currentImage: undefined,
			previewImage: undefined,
			pictureDataBase: '',
			progress: 0,
			message: '',
			loading:false,
			imageInfos: [],
			forms: {
				image: '',
				active: 0,
			},
		}
	},
	methods: {
		selectImage(event) {
			this.currentImage = event.target.files[0]
			this.UUID = this.currentImage.name.split(".")[1]
			this.previewImage = URL.createObjectURL(this.currentImage)
			this.progress = 0
			this.message = ''
		},

		async upload() {
			this.loading=true;
			const storage = this.$fireModule.storage()
			const imageRef = storage.ref(`slider/${this.$uniqueID(25) + '.' + this.UUID}`)

			const uploadTask = imageRef
				.put(this.currentImage)
				.then((snapshot) => {
					this.progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					return snapshot.ref.getDownloadURL().then((url) => {

						return url
					})
				})
				.catch((error) => {
					console.error('Error on uploading image', error)
				})
			await uploadTask.then((url) => {
				this.pictureDataBase = url
				this.loading=true;
			})
			this.progress = 0
			const config = {
				onUploadProgress: (progressEvent) =>
					(this.progress = Math.round(
						(100 * progressEvent.loaded) / progressEvent.total
					)),
			}

			this.forms.image = this.pictureDataBase
			this.forms.active = 1

				await this.$axios
					.post(
						`${process.env.API_BASE_URL}/sliders`,
						this.forms,
						config,
						{
							headers: {
								'Content-Type': 'application/json',
								'Authorization':this.$auth.getToken('local')
							},
						}
					)
					.then((data) => {
						this.loading=false;
						setTimeout(() => {
							this.$router.push('/slider')
						}, 1000)
						this.showAlert(data)
					})
					.catch((err) => {
						this.showErr(err)
					})
			},
			showAlert(data) {
				this.$swal(
					data.data.meta.status.toUpperCase(),
					data.data.meta.message,
					data.data.meta.code
				)
		},
		showErr(err) {
			this.$toast.error(err, {
				duration: 1000,
				theme: 'toasted-primary',
				closeOnSwipe: true,
				position: 'top-right',
				keepOnHover: true,
			})
		},
		showSuccess(data) {
			this.$toast.success(data, {
				duration: 1000,
				theme: 'toasted-primary',
				closeOnSwipe: true,
				position: 'top-right',
				keepOnHover: true,
			})
		},
	},
}
</script>
