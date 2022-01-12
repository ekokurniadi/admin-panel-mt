<template>
	<div>
		<h2 class="mb-4">Form Artikel</h2>
		<Nuxt-link to="/artikel" class="btn btn-danger mb-3"
			><i class="fa fa-arrow-left"></i> Back</Nuxt-link
		>
		<div class="card mb-4">
			<div class="card-body">
				<div class="form-group">
					<label for="image" class="col-md-2">Cover Artikel</label>
					<div class="col-md-12">
						<input
							type="file"
							ref="file"
							@change="selectImage()"
							v-show="this.$route.query.mode == 'edit'"
						/>
					</div>
					<div class="col-md-12">
						<div v-if="imagePreview">
							<div>
								<img
									class="img-thumbnail my-3"
									width="20%"
									:src="imagePreview"
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
				<div class="form-group">
					<label for="title" class="col-md-2">Judul Artikel</label>
					<div class="col-md-12">
						<input
							type="text"
							name="judul"
							id="judul"
							v-model="judul"
							class="form-control"
							:readonly="this.$route.query.mode == 'view'"
						/>
					</div>
					<label for="title" class="col-md-2">Isi Artikel</label>
					<div class="col-md-12">
						<textarea
							name="isi"
							id="isi"
							class="form-control"
							cols="30"
							rows="5"
							v-model="isi"
							:readonly="this.$route.query.mode == 'view'"
						></textarea>
					</div>
					<button
						:disabled="!image"
						v-show="this.$route.query.mode == 'edit'"
						class="btn btn-primary btn-md"
						@click="submit()"
					>
						<span class="fa fa-save"></span> Save
					</button>
					<nuxt-link class="btn btn-danger btn-md" to="/artikel"
						>Cancel</nuxt-link
					>
				</div>
			</div>
		</div>
		<v-overlay :value="overlay">
			<v-progress-circular indeterminate size="64"></v-progress-circular>
		</v-overlay>
	</div>
</template>
<script>
export default {
	data() {
		return {
			judul: '',
			image: undefined,
			imagePreview: undefined,
			isi: '',
			isUploaded: false,
			overlay:false,
		}
	},
	mounted() {
		this.GetData()
	},
	methods: {
		selectImage() {
			this.image = this.$refs.file.files.item(0)
			this.imagePreview = URL.createObjectURL(this.image)
			this.isUploaded = true
		},
		async GetData() {
			this.overlay=true
			await this.$axios
				.get(
					`${process.env.API_BASE_URL}/artikel/` +
						this.$route.params.id,
					{
						headers: {
							Authorization: `${this.$auth.getToken('local')}`,
						},
					}
				)
				.then((response) => {
					this.overlay=false
					this.image = response.data.data.image
					this.imagePreview = process.env.BASE_URL + this.image
					this.judul = response.data.data.title
					this.isi = response.data.data.content
				})
				.catch((err) => {
					this.overlay=false
					this.showErr(err)
				})
		},
		async submit() {
			this.overlay=true
			let formData = new FormData()
			if (this.isUploaded == true) {
				formData.append('image', this.image)
				formData.append('title', this.judul)
				formData.append('content', this.isi)
			} else {
				formData.append('image', this.image.replace('/artikel/', ''))
				formData.append('title', this.judul)
				formData.append('content', this.isi)
			}

			const response = await this.$axios
				.post(
					`${process.env.API_BASE_URL}/artikel/${this.$route.params.id}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: this.$auth.getToken('local'),
						},
					}
				)
				.then((res) => {
					this.overlay=false
					this.showAlert(res)
					this.$router.push('/artikel')
				})
				.catch((err) => {
					this.overlay=false
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
		truncate(string, value) {
			if (string.length > value) {
				return string.substring(0, value) + '…'
			} else {
				return string
			}
		},
	},
}
</script>
