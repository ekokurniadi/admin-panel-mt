<template>
	<div class="container">
		<div class="row d-flex">
			<div class="col-md-12 d-flex justify-content-center py-5">
				<div class="card shadow">
					<div class="colors"></div>
					<div class="card-body">
						<div class="d-flex justify-content-center">
							<div>
								<img
									src="images/avatars.png"
									alt=""
									width="70px"
								/>
							</div>
						</div>
						<h6 style="text-align: center">User Authentication</h6>

						<div class="form-circle mb-3 mt-4">
							<input
								type="text"
								class="rounded"
								name="username"
								id="username"
								v-model="login.phone_number"
								placeholder="Username"
							/>
						</div>
						<div class="form-circle">
							<input
								type="password"
								class="rounded"
								name="password"
								id="password"
								v-model="login.password"
								placeholder="Password"
							/>
						</div>
						<div class="form-circle mt-2">
							<input
								type="checkbox"
								onclick="myFunction();"
								name="show_pass"
								id="show_pass"
							/>
							<label for="" style="font-size: 9pt"
								>Show Password</label
							>
						</div>
						<div
							class="sign d-flex justify-content-center mt-3 mb-2"
						>
							<!-- <div class="sk-circle" id="test">
                                    <div class="sk-circle1 sk-child"></div>
                                    <div class="sk-circle2 sk-child"></div>
                                    <div class="sk-circle3 sk-child"></div>
                                    <div class="sk-circle4 sk-child"></div>
                                    <div class="sk-circle5 sk-child"></div>
                                    <div class="sk-circle6 sk-child"></div>
                                    <div class="sk-circle7 sk-child"></div>
                                    <div class="sk-circle8 sk-child"></div>
                                    <div class="sk-circle9 sk-child"></div>
                                    <div class="sk-circle10 sk-child"></div>
                                    <div class="sk-circle11 sk-child"></div>
                                    <div class="sk-circle12 sk-child"></div>
                                </div> -->
							<a
								href="javascript:void(0)"
								class="btn btn-danger btn-block btn-flat"
								id="btn-login"
								@click="submit"
								>LOGIN</a
							>
						</div>
					</div>
					<div
						class="form-circle d-flex justify-content-center align-content-end mb-2"
					>
						<h5 style="font-size: 9pt; color: grey">
							Made with
							<i class="fa fa-heart" style="color: red"></i> from
							Jambi, Indonesia
						</h5>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12">
				<div class="copy d-flex justify-content-center mt-4 mb-3">
					<h6>Copyright 2021</h6>
				</div>
			</div>
		</div>
	</div>
</template>
<style>

</style>
<script>
export default {
	layout: 'login',
	head: {
		title: 'User Auth',
		meta: [{ hid: 'User auth' }],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/helmet.ico' },
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
			},
			{
				rel: 'stylesheet',
				href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
			},
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;800&display=swap',
			},
			{
				rel: 'stylesheet',
				href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
			},
			{ rel: 'stylesheet', href: '/css/style.css' },
		],
		script: [{ src: '//cdn.jsdelivr.net/npm/sweetalert2@11' }],
	},
	data() {
		return {
			login: {
				phone_number: '',
				password: '',
			},
		}
	},

	methods: {
		async submit() {
			try {
				let response = await this.$auth.loginWith('local', {
					data: this.login,
				})
			} catch (err) {
				showErr(err)
			}
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
	},
}
</script>
