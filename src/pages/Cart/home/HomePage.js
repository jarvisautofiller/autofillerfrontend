import React, { useState } from "react";

import { Link } from "react-router-dom";

const HomePage = () => {

	return (
		<div id="layout-wrapper">
			<div className="main-content">

				<div className="page-content">
					<div className="container-fluid">
  
						<div className="row">
							<div className="col">

								<div className="h-100">
									<div className="row mb-3 pb-1">
										<div className="col-12">
											<div className="d-flex align-items-lg-center flex-lg-row flex-column">
												<div className="flex-grow-1">
													<h4 className="fs-16 mb-1">Good Morning!</h4>
													<p className="text-muted mb-0">Here's what's happening with your store today.</p>
												</div>
												<div className="mt-3 mt-lg-0">
													<form action="javascript:void(0);">
														<div className="row g-3 mb-0 align-items-center">
															<div className="col-sm-auto">
																<div className="input-group">
																	<input type="date" className="form-control border-0 dash-filter-picker shadow"
																		data-provider="flatpickr"
																		data-range-date="true" data-date-format="d M, Y" data-deafult-date="01 Jan 2022 to 31 Jan 2022" />

																</div>
															</div>
															<div className="col-auto">
																<button type="button" className="btn btn-soft-success">
																	<i className="ri-add-circle-line align-middle me-1"></i> Add Product</button>
															</div>

														</div>
													</form>
												</div>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-xl-3 col-md-6">
											<div className="card card-animate">
												<div className="card-body">
													<div className="d-flex align-items-center">
														<div className="flex-grow-1 overflow-hidden">
															<p className="text-uppercase fw-medium text-muted text-truncate mb-0"> Total Earnings</p>
														</div>
														<div className="flex-shrink-0">
															<h5 className="text-success fs-14 mb-0">
																<i className="ri-arrow-right-up-line fs-13 align-middle"></i> +16.24 %
															</h5>
														</div>
													</div>
													<div className="d-flex align-items-end justify-content-between mt-4">
														<div>
															<h4 className="fs-22 fw-semibold ff-secondary mb-4">$<span className="counter-value" data-target="559.25">0</span>k </h4>
															<Link className="text-decoration-underline">View net earnings</Link>
														</div>
														<div className="avatar-sm flex-shrink-0">
															<span className="avatar-title bg-success-subtle rounded fs-3">
																<i className="fa-solid fa-dollar-sign text-success"></i>
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="col-xl-3 col-md-6">
											<div className="card card-animate">
												<div className="card-body">
													<div className="d-flex align-items-center">
														<div className="flex-grow-1 overflow-hidden">
															<p className="text-uppercase fw-medium text-muted text-truncate mb-0">Orders</p>
														</div>
														<div className="flex-shrink-0">
															<h5 className="text-danger fs-14 mb-0">
																<i className="ri-arrow-right-down-line fs-13 align-middle"></i> -3.57 %
															</h5>
														</div>
													</div>
													<div className="d-flex align-items-end justify-content-between mt-4">
														<div>
															<h4 className="fs-22 fw-semibold ff-secondary mb-4"><span className="counter-value" data-target="36894">0</span></h4>
															<Link className="text-decoration-underline">View all orders</Link>
														</div>
														<div className="avatar-sm flex-shrink-0">
															<span className="avatar-title bg-info-subtle rounded fs-3">
																<i className="fa-solid fa-cart-shopping text-info"></i>
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="col-xl-3 col-md-6">
											<div className="card card-animate">
												<div className="card-body">
													<div className="d-flex align-items-center">
														<div className="flex-grow-1 overflow-hidden">
															<p className="text-uppercase fw-medium text-muted text-truncate mb-0">Customers</p>
														</div>
														<div className="flex-shrink-0">
															<h5 className="text-success fs-14 mb-0">
																<i className="ri-arrow-right-up-line fs-13 align-middle"></i> +29.08 %
															</h5>
														</div>
													</div>
													<div className="d-flex align-items-end justify-content-between mt-4">
														<div>
															<h4 className="fs-22 fw-semibold ff-secondary mb-4"><span className="counter-value" data-target="183.35">0</span>M </h4>
															<Link className="text-decoration-underline">See details</Link>
														</div>
														<div className="avatar-sm flex-shrink-0">
															<span className="avatar-title bg-warning-subtle rounded fs-3">
																<i className="fa-solid fa-user text-warning"></i>
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="col-xl-3 col-md-6">
											<div className="card card-animate">
												<div className="card-body">
													<div className="d-flex align-items-center">
														<div className="flex-grow-1 overflow-hidden">
															<p className="text-uppercase fw-medium text-muted text-truncate mb-0"> My Balance</p>
														</div>
														<div className="flex-shrink-0">
															<h5 className="text-muted fs-14 mb-0">
																+0.00 %
															</h5>
														</div>
													</div>
													<div className="d-flex align-items-end justify-content-between mt-4">
														<div>
															<h4 className="fs-22 fw-semibold ff-secondary mb-4">$<span className="counter-value" data-target="165.89">0</span>k </h4>
															<Link className="text-decoration-underline">Withdraw money</Link>
														</div>
														<div className="avatar-sm flex-shrink-0">
															<span className="avatar-title bg-primary-subtle rounded fs-3">
																<i className="fa-solid fa-wallet text-primary"></i>
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>







								</div>

							</div>


						</div>

					</div>
				</div>


			</div>
		</div >
	);
};

export default HomePage;