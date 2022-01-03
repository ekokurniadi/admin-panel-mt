<template>
	<div>
		<app-heading></app-heading>
			<div class="card">
				<div class="card-body">
					<div class="row">
						<div class="col-md-3">
							<button class="btn btn-primary"><span class="fa fa-plus"></span> Add New</button>
						</div>
						<div class="col-md-5"></div>
					</div>
					<div class="row mt-2">
						<div class="col-md-12">
							<table class="table table-bordered table-hovered">
								<thead>
									<tr>
										<th width="30px">No</th>
										<th>Gambar</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>1</td>
										<td>123.png</td>
										<td></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		<modal-upload></modal-upload>
	</div>
</template>

<script>
import PageHeading from '@/components/PageHeading/index.vue'
import ModalUpload from '@/components/Modal/uploadSlider.vue'
export default {
	components: {
		'app-heading': PageHeading,
		'modal-upload': ModalUpload,
	},
}
</script>
