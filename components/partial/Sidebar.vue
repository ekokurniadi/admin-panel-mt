<template>
	<div class="sidebar sidebar-dark bg-dark">
		<ul class="list-unstyled">
			 <li>
                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false"> <i class="fa fa-fw fa-book"></i> Master</a>
                <ul class="collapse list-unstyled" id="pageSubmenu">
					<li>
						<a href="#User" data-toggle="collapse" aria-expanded="false"> User</a>
						<ul class="collapse list-unstyled" id="User">
							<li>
							<Nuxt-link to="/user"> - Tukang</Nuxt-link>
							<Nuxt-link to="/user"> - Client</Nuxt-link>
							<Nuxt-link to="/user"> - Mitra</Nuxt-link>
							<Nuxt-link to="/user"> - Administrator</Nuxt-link>
							</li>
						</ul>
					</li>
					<li>
						<a href="#Konten" data-toggle="collapse" aria-expanded="false"> Konten</a>
						<ul class="collapse list-unstyled" id="Konten">
							<li>
							<Nuxt-link to="/slider"> - Slider</Nuxt-link>
							<Nuxt-link to="/artikel"> - Artikel</Nuxt-link>
							</li>
						</ul>
					</li>
					<li>
						<a href="#Barang" data-toggle="collapse" aria-expanded="false"> Barang</a>
						<ul class="collapse list-unstyled" id="Barang">
							<li>
							<Nuxt-link to="/user"> - Kategori Barang</Nuxt-link>
							<Nuxt-link to="/user"> - Barang</Nuxt-link>
							</li>
						</ul>
					</li>
                </ul>
            </li>
			<li>
                <a href="#Project" data-toggle="collapse" aria-expanded="false"> <i class="fa fa-fw fa-book"></i> Transaksi</a>
                <ul class="collapse list-unstyled" id="Project">
					<li>
						<Nuxt-link to="/user">Project</Nuxt-link>
						<Nuxt-link to="/user">Proposal</Nuxt-link>
					</li>
                </ul>
            </li>
		</ul>

	</div>
</template>

