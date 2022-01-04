<template>

	<div>
		<h2 class="mb-4">Form Slider</h2>
		<Nuxt-link to="/slider" class="btn btn-danger mb-3"><i class="fa fa-arrow-left"></i> Back</Nuxt-link>
		<div class="card mb-4">
			<div class="card-body">
					<div class="form-group">
						 <label class="col-md-2" for="name">File Image</label>
						 <div class="col-md-6">
							<input type="file" ref="file" @change="selectImage()" name="image" id="image"/>
							<button :disabled="!currentImage" class="btn btn-primary" @click="upload()">Submit</button>
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
						<img class="img-thumbnail my-3" width="100%" :src="previewImage" alt="" />
					</div>
					</div>


			</div>
		</div>
	</div>

</template>


<script>
export default {

	data(){
		return {
			currentImage: undefined,
			previewImage: undefined,

			progress: 0,
			message: "",

			imageInfos: [],
		}
	},
	methods:{
		selectImage(){
			this.currentImage = this.$refs.file.files.item(0);
			this.previewImage = URL.createObjectURL(this.currentImage);
			this.progress = 0;
			this.message ="";

		},
		async upload(){
			this.progress = 0;
				const config = {
					onUploadProgress: progressEvent => this.progress =Math.round((100 * progressEvent.loaded) / progressEvent.total)
				}
				let formData  = new FormData();
				formData.append('image',this.currentImage)
				formData.append('active',1);
				this.$axios.post('http://localhost:8080/api/v1/sliders',formData,config,
				{
					headers:{
						'Content-Type': 'multipart/form-data'
					}
				}).then(data =>{
					setTimeout(() => {
						this.$router.push("/slider");
					}, 1000);
					this.showAlert(data);
				}).catch(function(){
					console.log('gagal');
				});
			},
			showAlert(data) {
			this.$swal(data.data.meta.status.toUpperCase(),data.data.meta.message,data.data.meta.code);
    	},
	}
}
</script>
