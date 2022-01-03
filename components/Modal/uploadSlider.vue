<template>
	 <div class="modal fade" id="uploadSlider" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Upload Image Slider</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
					<form id="_form" action="" method="post" enctype="multipart/form-data">
						<div class="form-group">
							<div class="col-md-12">
								<label for="">Gambar</label>
								<input type="file" name="gambar" id="gambar" class="form-control">
							</div>
						</div>
					</form>
				</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>
