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
						ref="file"
						@change="selectImage($event)"
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
						<option v-bind:value="status">
							<div v-if="status == 1">Active</div>
							<div v-else>Non Active</div>
						</option>
						<option value="1">Active</option>
						<option value="0">Non Active</option>
					</select>
				</div>
				<button class="btn btn-primary" @click="submit()">Submit</button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'detail',
	data() {
		return {
			status: '',
			currentImage: undefined,
			previewImage: undefined,
			isUploaded: false,
			progress: 0,
		}
	},
	mounted() {
		this.GetData()
	},
	methods: {
		selectImage(event) {
			this.currentImage = event.target.files[0]
			this.previewImage = URL.createObjectURL(this.currentImage)
			this.progress = 0
			this.message = ''
			this.isUploaded = true

		},
		async GetData() {
			await this.$axios
				.get(
					`${process.env.API_BASE_URL}/sliders/` +
						this.$route.params.id
				)
				.then((response) => {
					this.currentImage = response.data.data.image
					this.previewImage = process.env.BASE_URL + this.currentImage
					this.status = response.data.data.active
				})
				.catch((err) => {
					this.showErr(err)
				})
		},
		async submit(event) {
			this.progress = 0
			const config = {
				onUploadProgress: (progressEvent) =>
					(this.progress = Math.round(
						(100 * progressEvent.loaded) / progressEvent.total
					)),
			}
			let formData = new FormData()
			if (this.isUploaded==true) {
				formData.append('image', this.currentImage)
				formData.append('active', this.status)
			} else {
				formData.append('image', this.currentImage.replace('/slider/',''))
				formData.append('active', this.status)
			}

			await this.$axios.post(
				`${process.env.API_BASE_URL}/sliders/` + this.$route.params.id,
				formData,
				config,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			).then((response)=>{
				this.showAlert(response)
				this.$router.push('/slider')
			}).catch((err)=>{
				this.showErr(err)
				this.progress=0
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
