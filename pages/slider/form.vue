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
							ref="file"
							@change="selectImage()"
							name="image"
							id="image"
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
	</div>
</template>

<script>
export default {
	data() {
		return {
			currentImage: undefined,
			previewImage: undefined,

			progress: 0,
			message: '',

			imageInfos: [],
		}
	},
	methods: {
		selectImage() {
			this.currentImage = this.$refs.file.files.item(0)
			this.previewImage = URL.createObjectURL(this.currentImage)
			this.progress = 0
			this.message = ''

		},
		async upload() {
			this.progress = 0
			const config = {
				onUploadProgress: (progressEvent) =>
					(this.progress = Math.round(
						(100 * progressEvent.loaded) / progressEvent.total
					)),
			}
			let formData = new FormData()
			formData.append('image', this.currentImage)
			formData.append('active', 1)
			await this.$axios
				.post(
					`${process.env.API_BASE_URL}/sliders`,
					formData,
					config,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							'Authorization':this.$auth.getToken('local')
						},
					}
				)
				.then((data) => {
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
				duration:1000,
				theme: 'toasted-primary',
				closeOnSwipe: true,
				position: 'top-right',
				keepOnHover: true,
			})
		},
		showSuccess(data) {
			this.$toast.success(data, {
				duration:1000,
				theme: 'toasted-primary',
				closeOnSwipe: true,
				position: 'top-right',
				keepOnHover: true,
			})
		},
	},
}
</script>
