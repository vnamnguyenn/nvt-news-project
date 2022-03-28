import React from 'react';
import './sidebar.scss';
const Sidebar = () => {
	return (
		<div className="sidebar">
			<div className="sidebar__top">
				<span className="sidebar__logo">NVT Blog</span>
			</div>
      <hr />
			<div className="sidebar__center">
				<ul>
					<li>
						<span>Dashboard</span>
					</li>
					<li>
						<span>Posts</span>
					</li>
					<li>
						<span>Videos</span>
					</li>
					<li>
						<span>Categories</span>
					</li>
					<li>
						<span>Tags</span>
					</li>
					<li>
						<span>Accounts</span>
					</li>
				</ul>
			</div>
			<div className="sidebar__bottom">color option</div>
		</div>
	);
};

export default Sidebar;
