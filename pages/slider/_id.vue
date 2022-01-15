<template>
	<div>
		<h2 class="mb-4">Edit Slider</h2>
		<Nuxt-link to="/slider" class="btn btn-danger mb-3"
			><i class="fa fa-arrow-left"></i> Back</Nuxt-link
		>
		<div class="card mb-4">
			<div class="card-body">
				<label class="col-md-2" for="name">File Image</label>
				<div class="col-md-10">
					<input
						type="file"
						accept="image/*"
						@change="selectImage"
						name="image"
						id="image"
					/>
				</div>
				<div class="col-md-12 progress" v-if="isUploaded">
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

				<div class="col-md-12" v-if="previewImage">
					<div>
						<img
							class="img-thumbnail my-3"
							width="50%"
							:src="previewImage"
							alt=""
						/>
					</div>
				</div>
				<label class="col-md-2" for="name">Status</label>
				<div class="col-md-10">
					<select
						name="status"
						id="status"
						class="form-control"
						v-model="status"
					>
						<option v-bind:value="status" selected>
							<div v-if="status == 1">Active</div>
							<div v-else>Non Active</div>
						</option>
						<option value="1">Active</option>
						<option value="0">Non Active</option>
					</select>
				</div>
				<button class="btn btn-primary" @click="submit()">
					Submit
				</button>
			</div>
		</div>
		<v-overlay :value="this.loading">
			<v-progress-circular indeterminate size="64"></v-progress-circular>
		</v-overlay>
	</div>
</template>
<script>
import imageCompressor from 'vue-image-compressor'

export default {
	name: 'detail',
	components: { imageCompressor },
	data() {
		return {
			status: '',
			currentImage: undefined,
			previewImage: undefined,
			isUploaded: false,
			loading:false,
			progress: 0,
			forms: {
				image: '',
				active: 0,
			},
			pictureDataBase: '',
			UUID: '',
			imageBefore: '',
		}
	},
	mounted() {
		this.GetData()
	},
	methods: {

		selectImage(event) {

			this.currentImage = event.target.files[0]
			this.UUID =this.currentImage.name.split('.')[1]
			this.previewImage = URL.createObjectURL(this.currentImage)
			this.progress = 0
			this.message = ''
			this.isUploaded = true
		},
		async GetData() {
			this.loading=true;
			await this.$axios
				.get(
					`${process.env.API_BASE_URL}/sliders/` +
						this.$route.params.id
				)
				.then((response) => {
					this.currentImage = response.data.data.image
					this.imageBefore = response.data.data.image
					this.previewImage = this.currentImage
					this.status = response.data.data.active
					this.loading=false;
				})
				.catch((err) => {
					this.showErr(err)
				})
		},
		async submit() {
			this.loading=true;
			this.deleteImage()
			const storage = this.$fireModule.storage()
			const imageRef = storage.ref(
				`slider/${this.$uniqueID(25) + '.' + this.UUID}`
			)

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
			})
			this.forms.image = this.pictureDataBase
			this.forms.active = this.status

			await this.$axios
				.post(
					`${process.env.API_BASE_URL}/sliders/` +
						this.$route.params.id,
					this.forms,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: this.$auth.getToken('local'),
						},
					}
				)
				.then((response) => {
					this.loading=false;
					this.showAlert(response)
					this.$router.push('/slider')
				})
				.catch((err) => {
					this.showErr(err)
					this.progress = 0
				})
		},
		async deleteImage() {
			await this.$fireModule
				.storage()
				.refFromURL(this.imageBefore)
				.delete()
				.then(() => {})
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
	},
}
</script>
