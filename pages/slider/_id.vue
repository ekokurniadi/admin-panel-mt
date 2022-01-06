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
						@change="selectImage()"
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
							<div v-if="status==1">Active</div>
							<div v-else>Non Active</div>
							</option>
						<option value="1">Active</option>
						<option value="0" >Non Active</option>
					</select>
				</div>
				<button
					class="btn btn-primary"
					@click="save()">
					Submit
				</button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'detail',
	data(){
		return {
			status :'',
			currentImage: undefined,
			previewImage: undefined,
			isUploaded :false,
			progress: 0,
		}
	},
	mounted(){
		this.GetData()
	},
	methods:{
		selectImage() {
			this.currentImage = this.$refs.file.files.item(0)
			this.previewImage = URL.createObjectURL(this.currentImage)
			this.progress = 0
			this.message = ''
			this.isUploaded=true
		},
		async GetData(){
			await this.$axios.get('http://localhost:8080/api/v1/sliders/'+this.$route.params.id)
			.then((response)=>{
				console.log(response.data.data)
				this.currentImage = response.data.data.image
				this.previewImage = 'http://localhost:8080' + this.currentImage
				this.status = response.data.data.active
			})
		}
	}
}
</script>
