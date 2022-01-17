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
						<input type="file" ref="file" @change="selectImage" />
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
						></textarea>
					</div>
					<button
						:disabled="!image"
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
import Editor from '@tinymce/tinymce-vue'
export default {
	components: {
		editor: Editor,
	},
	data() {
		return {
			judul: '',
			image: undefined,
			isi: '',
			imagePreview: undefined,
			overlay: false,
			UUID: '',
			pictureDataBase: '',
			forms: {
				title: '',
				image: '',
				content: '',
			},
		}
	},
	methods: {
		selectImage(event) {
			this.image = event.target.files[0]
			this.UUID = this.image.name.split('.')[1]
			this.imagePreview = URL.createObjectURL(this.image)
		},
		async submit() {
			this.overlay = true
			const storage = this.$fireModule.storage()
			const imageRef = storage.ref(
				`artikel/${this.$uniqueID(25) + '.' + this.UUID}`
			)

			const uploadTask = imageRef
				.put(this.image)
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
				this.overlay = true
			})
			this.forms.image = this.pictureDataBase
			this.forms.title = this.judul
			this.forms.content = this.isi
			const response = await this.$axios
				.post(`${process.env.API_BASE_URL}/artikel`, this.forms, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: this.$auth.getToken('local'),
					},
				})
				.then((res) => {
					this.overlay = false
					this.showAlert(res)
					this.$router.push('/artikel')
				})
				.catch((err) => {
					this.overlay = false
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
