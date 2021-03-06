<template>
	<div>
		<h2 class="mb-4">List of Artikel</h2>
		<div class="card mb-4">
			<div class="card-body">
				<Nuxt-link to="/artikel/form" class="btn btn-primary mb-3"
					><i class="fa fa-plus"></i> Add New</Nuxt-link
				>

				<div class="row">
					<div class="col-md-3 offset-8">
						<input
							type="text"
							class="form-control"
							name="search"
							id="search"
							v-model="searchTitle"
							@keyup="retrieveData()"
							placeholder="search"
						/>
					</div>
					<div class="col-md-1 align-items-center">
						<button
							class="btn btn-sm btn-primary"
							@click="retrieveData()"
						>
							<span class="fa fa-search"></span> Search
						</button>
					</div>
				</div>
				<div class="row">
					<div class="col-md-3">
						<v-select
							:items="pageSizes"
							v-model="pageSize"
							label="Items per Page"
							@change="handlePageSizeChange"
						></v-select>
					</div>
					<div class="col-md-9">
						<v-pagination
							v-model="page"
							:length="totalPages"
							total-visible="7"
							next-icon="mdi-menu-right"
							prev-icon="mdi-menu-left"
							@input="handlePageChange"
						></v-pagination>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<v-data-table
							:headers="headers"
							:items="sliders"
							:loading="loading"
							class="elevation-1 spacing-playground pa-6"
							:hide-default-footer="true"
						>
							<template v-slot:[`item.image`]="{ item }">
								<v-img
									:src="item.image"
									class="img-thumbnail img-fluid"
									style="width: 250px"
								/>
							</template>
							<template v-slot:[`item.actions`]="{ item }">
								<v-icon
									small
									class="mr-2 btn btn-light btn-sm"
									style="color: black"
									@click="viewData(item.id, 'view')"
								>
									mdi-eye
								</v-icon>
								<v-icon
									small
									class="mr-2 btn btn-warning btn-sm"
									style="color: black"
									@click="editData(item.id, 'edit')"
								>
									mdi-pencil
								</v-icon>
								<v-icon
									small
									@click="deleteData(item.id)"
									class="mr-2 btn btn-danger btn-sm"
									style="color: white"
								>
									mdi-delete
								</v-icon>
							</template>
						</v-data-table>
					</div>
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
	name: 'artikel-list',
	data() {
		return {
			sliders: [],
			searchTitle: '',
			overlay: false,
			headers: [
				{
					text: 'Cover',
					align: 'start',
					sortable: false,
					value: 'image',
				},
				{
					text: 'Judul',
					align: 'start',
					sortable: false,
					value: 'title',
				},
				{
					text: 'Content',
					align: 'start',
					sortable: false,
					value: 'content',
				},
				{
					text: 'UploadedAt',
					align: 'center',
					sortable: false,
					value: 'createdAt',
				},
				{
					text: 'Viewers',
					align: 'center',
					sortable: false,
					value: 'viewsCount',
				},
				{
					text: 'Actions',
					align: 'center',
					sortable: false,
					value: 'actions',
				},
			],
			page: 1,
			totalPages: 0,
			pageSize: 10,
			pageSizes: [5, 10, 25, 50, 100],
			loading: true,
		}
	},
	watch: {
		options: {
			handler() {
				this.retrieveData()
			},
			deep: true,
		},
	},
	methods: {
		getRequestParams(searchTitle, page, pageSize) {
			let params = {}
			if (searchTitle) {
				params['title'] = searchTitle
			}
			if (page) {
				params['page'] = page - 1
			}
			if (pageSize) {
				params['size'] = pageSize
			}
			return params
		},

		async getAll(params) {
			return await this.$axios.get(
				`${process.env.API_BASE_URL}/artikel_fetch`,
				{ params },
				{
					headers: {
						Authorization: `${this.$auth.getToken('local')}`,
					},
				}
			)
		},
		retrieveData() {
			this.overlay = true
			const params = this.getRequestParams(
				this.searchTitle,
				this.page,
				this.pageSize
			)
			this.getAll(params)
				.then((response) => {
					this.loading = true
					this.overlay = false
					const { data, totalPages } = response.data
					this.sliders = data.map(this.getDisplayData)
					this.totalPages = totalPages
					this.loading = false
				})
				.catch((e) => {
					this.showErr(e)
				})
		},
		handlePageChange(value) {
			this.page = value
			this.retrieveData()
		},
		handlePageSizeChange(size) {
			this.pageSize = size
			this.page = 1
			this.retrieveData()
		},
		refreshList() {
			this.retrieveData()
		},
		editData(id, data) {
			this.$router.push(`/artikel/${id}?mode=${data}`)
		},
		viewData(id, data) {
			this.$router.push(`/artikel/${id}?mode=${data}`)
		},
		async deleteData(id) {
			this.overlay = true
			if (confirm('Are you sure to delete this data ?')) {
				await this.$axios
					.get(`${process.env.API_BASE_URL}/artikel/${id}`, {
						headers: {
							Authorization: `${this.$auth.getToken('local')}`,
						},
					})
					.then((res) => {
						this.deleteImage(res.data.data)
					})
					.catch((error) => {
						this.showErr(error)
					})
			}
		},
		async deleteImage(data) {
			await this.$axios
				.delete(`${process.env.API_BASE_URL}/artikel/${data.id}`, {
					headers: {
						Authorization: `${this.$auth.getToken('local')}`,
					},
				})
				.then((response) => {
					this.overlay = false
					this.showAlert(response)
					this.retrieveData()
				})
				.catch((err) => {
					this.overlay = false
					this.showErr(err)
				})
			await this.$fireModule
				.storage()
				.refFromURL(data.image)
				.delete()
				.then(() => {})
				.catch((err) => {
					this.showErr(err)
				})
		},
		getDisplayData(data) {
			return {
				id: data.id,
				image: data.image,
				title: data.title,
				content: this.truncate(data.content, 25),
				viewsCount: data.views_count,
				createdAt: data.created_at,
			}
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
		showAlert(data) {
			this.$swal(
				data.data.meta.status.toUpperCase(),
				data.data.meta.message,
				data.data.meta.code
			)
		},
		truncate(string, value) {
			if (string.length > value) {
				return string.substring(0, value) + '…'
			} else {
				return string
			}
		},
	},
	mounted() {
		this.retrieveData()
	},
}
</script>
<style>
.theme--light.v-pagination .v-pagination__item--active {
	color: red;
}
</style>
