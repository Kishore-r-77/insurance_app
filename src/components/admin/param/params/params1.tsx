import React, { Fragment, useEffect, useState } from "react";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";
import CustomTooltip from "../../../../utilities/cutomToolTip/customTooltip";
import "./params.css";
import Param from "../param/param";
import { useNavigate, createSearchParams } from "react-router-dom";
const Params = () => {
  const {
    sendRequest: sendScreenGetRequest,
    status: screenGetStatus,
    data: getScreenResponse,
    error: screenGetError,
  } = useHttp(getData, true);
  const [pageAndSearch, setPageAndSearch] = useState({
    pageNum: 1,
    pageSize: 10,
    searchString: "",
    searchCriteria: "name",
    sortColumn: "name",
    sortDirection: "asc",
    firstTime: true,
  });

  const [searchString, setSearchString] = useState("");

  const [searchCriteria, setSearchCriteria] = useState("name");

  const [modalData, setModalData] = useState({ showModal: false, data: {} });

  const navigate = useNavigate();

  useEffect(() => {
    sendScreenGetRequest({
      apiUrlPathSuffix: "/params",
      getDataParams: pageAndSearch,
    });
  }, [sendScreenGetRequest, pageAndSearch]);

  //pagination variables calculation
  const pageActive = pageAndSearch.pageNum;
  const pageNeighbourBefore = pageActive - 1;
  const pageNeighbourAfter = pageActive + 1;
  const totalRecords =
    !screenGetError && screenGetStatus === "completed"
      ? getScreenResponse.paginationData.totalRecords
      : 0;
  const startCount = (pageAndSearch.pageNum - 1) * pageAndSearch.pageSize + 1;
  const calcEndCount =
    (pageAndSearch.pageNum - 1) * pageAndSearch.pageSize +
    pageAndSearch.pageSize;

  const endCount = calcEndCount > totalRecords ? totalRecords : calcEndCount;
  const lastPage = Math.ceil(totalRecords / pageAndSearch.pageSize);
  const disableNext = pageActive === lastPage;
  const disablePrev = pageActive === 1;
  //end pagination variable calculation

  //sorting css class settings
  const sortingClass =
    pageAndSearch.sortDirection === "desc" ? "sorting_desc" : "sorting_asc";
  const columnFieldSortCssClasses = {
    name: pageAndSearch.sortColumn === "name" ? sortingClass : "sorting",
  };

  //sorting css class settings

  const pageNumberChangeHandler = (pageNumber: any) => {
    setPageAndSearch((prevState) => ({
      ...prevState,
      pageNum: Number(pageNumber),
    }));
  };

  const searchStringChangeHandler = (event: any) => {
    setSearchString(event.target.value);
  };

  const pageSizeChangeHandler = (event: any) => {
    const pageSize = Number(event.target.value);

    setPageAndSearch((prevState) => ({ ...prevState, pageSize: pageSize }));
  };

  const searchCriteriaChangeHandler = (event: any) => {
    setSearchCriteria(event.target.value);
  };

  const searchHandler = () => {
    setPageAndSearch((prevState) => ({
      ...prevState,
      searchString,
      searchCriteria,
    }));
  };
  const handleColumnSort = (fieldname: any) => {
    if (
      fieldname === pageAndSearch.sortColumn &&
      pageAndSearch.sortDirection === "asc"
    ) {
      setPageAndSearch((prevState) => ({
        ...prevState,
        sortDirection: "desc",
      }));
    } else {
      setPageAndSearch((prevState) => ({
        ...prevState,
        sortColumn: fieldname,
        sortDirection: "asc",
      }));
    }
  };
  //handle incorrect page requests resulting in empty pages
  if (
    !screenGetError &&
    screenGetStatus === "completed" &&
    pageAndSearch.pageNum > 1 &&
    startCount > totalRecords
  ) {
    var newPageNum = pageAndSearch.pageNum - 1;
    while (true) {
      const newStartCount = (newPageNum - 1) * pageAndSearch.pageSize + 1;
      if (newStartCount <= totalRecords || newPageNum === 1) {
        break;
      }

      newPageNum = newPageNum - 1;
    }

    setPageAndSearch((prevState) => ({ ...prevState, pageNum: newPageNum }));
  }

  const handleModal = (params: any) => {
    setModalData({ showModal: params.show, data: params.data });
    //if data was modified in modal, rfresh the data from server
    if (params.status === "save") {
      sendScreenGetRequest({
        apiUrlPathSuffix: "/params",
        getDataParams: pageAndSearch,
      });
    }
  };

  const navigateToLink = (params: any) => {
    if (params.link === "/paramItems") {
      navigate({
        pathname: params.link,
        search: createSearchParams({
          companyId: params.companyId,
          name: params.name,
          languageId: params.languageId,
        }).toString(),
      });
    }
  };

  return (
    <Fragment>
      <div style={{ minHeight: "500px" }}>
        <div
          className="row d-flex justify-content-between"
          style={{ margin: "auto" }}
        >
          <h2>Param Search</h2>

          <div>
            <CustomTooltip text="Add Param">
              <button
                type="button"
                className="btn btn-primary "
                placement="bottom"
                style={{ lineHeight: "1", marginTop: ".5em" }}
                onClick={() => {
                  let modalInputData = { mode: "create" };

                  handleModal({ show: true, data: modalInputData });
                }}
              >
                <i className="fa fa-plus-square"></i>
              </button>
            </CustomTooltip>
          </div>
        </div>
        {screenGetStatus === "pending" && (
          <div
            className="d-flex justify-content-center"
            style={{ marginTop: "10%" }}
          >
            <div
              className="spinner-border "
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {screenGetError && screenGetStatus === "completed" && (
          <div
            className="alert alert-danger"
            style={{ fontSize: "95%", padding: "0rem" }}
          >
            <strong>Failed to get data!</strong>
            <span className="pl-1">{screenGetError}</span>
          </div>
        )}

        {screenGetStatus === "completed" && !screenGetError && (
          <div className="dataTables_wrapper">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div
                  className="dataTables_length bs-select"
                  style={{ display: "inline-flex" }}
                >
                  <label style={{ marginRight: "0.3rem" }}>Show</label>
                  <select
                    className="custom-select custom-select-sm form-control form-control-sm"
                    value={pageAndSearch.pageSize}
                    onChange={pageSizeChangeHandler}
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  <label style={{ marginLeft: "0.3rem" }}>entries</label>
                </div>
              </div>

              <div
                className="col-sm-12 col-md-6"
                style={{ textAlign: "right" }}
              >
                <div
                  className="dataTables_filter"
                  style={{ display: "inline-flex" }}
                >
                  <label style={{ marginRight: "0.3rem" }}>SearchBy:</label>
                  <select
                    className="custom-select custom-select-sm form-control form-control-sm"
                    value="name"
                    onChange={searchCriteriaChangeHandler}
                  >
                    {getScreenResponse.fieldMapping.map((data: any) => (
                      <option value={data.fieldName} key={data.fieldName}>
                        {data.displayName}
                      </option>
                    ))}
                  </select>

                  <div className="input-group">
                    <input
                      type="search"
                      className="form-control form-control-sm"
                      value={searchString}
                      onChange={searchStringChangeHandler}
                      placeholder=""
                    ></input>
                    <span
                      className="input-group-append "
                      style={{ height: "calc(1.5em + 0.5rem + 2px)" }}
                    >
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={searchHandler}
                        style={{ paddingTop: "0rem" }}
                      >
                        <i className="fa fa-search"></i>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <table
                  id="dtBasicExample"
                  className="table table-striped table-bordered table-sm dataTable"
                  cellSpacing="0"
                  width="100%"
                >
                  <thead>
                    <tr role="row">
                      <th
                        className={`th-sm ${
                          columnFieldSortCssClasses.name
                            ? columnFieldSortCssClasses.name
                            : ""
                        }`}
                        onClick={() => {
                          handleColumnSort("name");
                        }}
                      >
                        Name
                      </th>

                      <th className="th-sm">Description</th>
                      <th className="th-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getScreenResponse.data.map((data: any) => (
                      <tr key={data.name}>
                        <td>{data.name}</td>
                        <td>{data.longdesc}</td>
                        <td>
                          <CustomTooltip text="Edit">
                            <i
                              className="fa fa-edit"
                              style={{
                                fontSize: "1.33333em",
                                marginRight: ".5em",
                              }}
                              onClick={() => {
                                let modalInputData = {
                                  companyId: data.companyId,
                                  name: data.name,
                                  languageId: data.languageId,
                                  mode: "update",
                                };

                                handleModal({
                                  show: true,
                                  data: modalInputData,
                                });
                              }}
                            ></i>
                          </CustomTooltip>

                          <CustomTooltip text="View Items">
                            <i
                              className="fa fa-eye"
                              style={{
                                fontSize: "1.33333em",
                                marginRight: ".5em",
                              }}
                              onClick={() => {
                                navigateToLink({
                                  link: "/paramItems",
                                  companyId: data.companyId,
                                  name: data.name,
                                  languageId: data.languageId,
                                });
                              }}
                            ></i>
                          </CustomTooltip>

                          <CustomTooltip text="Delete">
                            <i
                              className="fa fa-trash"
                              style={{
                                fontSize: "1.33333em",
                                marginRight: ".5em",
                              }}
                              onClick={() => {
                                let modalInputData = {
                                  companyId: data.companyId,
                                  name: data.name,
                                  languageId: data.languageId,
                                  mode: "delete",
                                };

                                handleModal({
                                  show: true,
                                  data: modalInputData,
                                });
                              }}
                            ></i>
                          </CustomTooltip>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-5">
                <div className="dataTables_info">
                  Showing {startCount} to {endCount} of {totalRecords} entries
                </div>
              </div>
              <div className="col-sm-12 col-md-7">
                <div className="dataTables_paginate paging_simple_numbers">
                  <ul className="pagination">
                    <li
                      className={`paginate_button page-item previous ${
                        disablePrev ? "disabled" : ""
                      } `}
                    >
                      <a
                        href="#"
                        onClick={() => {
                          pageNumberChangeHandler(pageActive - 1);
                        }}
                        className="page-link"
                        aria-label="Previous"
                      >
                        {" "}
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                      </a>
                    </li>
                    {pageActive > 2 && (
                      <li className="paginate_button page-item ">
                        <a
                          href="#"
                          className="page-link"
                          onClick={() => {
                            pageNumberChangeHandler(1);
                          }}
                        >
                          1
                        </a>
                      </li>
                    )}
                    {pageActive === 4 && (
                      <li className="paginate_button page-item ">
                        <a
                          href="#"
                          className="page-link"
                          onClick={() => {
                            pageNumberChangeHandler(2);
                          }}
                        >
                          2
                        </a>
                      </li>
                    )}
                    {pageActive > 4 && (
                      <li className="paginate_button page-item disabled">
                        <a href="#" className="page-link">
                          ...
                        </a>
                      </li>
                    )}

                    {pageActive > 1 && (
                      <li className="paginate_button page-item ">
                        <a
                          href="#"
                          className="page-link"
                          onClick={() => {
                            pageNumberChangeHandler(pageNeighbourBefore);
                          }}
                        >
                          {pageNeighbourBefore}
                        </a>
                      </li>
                    )}
                    <li className="paginate_button page-item active">
                      <a href="#" className="page-link">
                        {pageActive}
                      </a>
                    </li>
                    {pageActive !== lastPage && (
                      <li className="paginate_button page-item ">
                        <a
                          href="#"
                          className="page-link"
                          onClick={() => {
                            pageNumberChangeHandler(pageNeighbourAfter);
                          }}
                        >
                          {pageNeighbourAfter}
                        </a>
                      </li>
                    )}

                    {lastPage - pageNeighbourAfter > 2 && (
                      <li className="paginate_button page-item disabled">
                        <a href="#" className="page-link">
                          ...
                        </a>
                      </li>
                    )}
                    {lastPage - pageNeighbourAfter === 2 && (
                      <li className="paginate_button page-item ">
                        <a
                          href="#"
                          className="page-link"
                          onClick={() => {
                            pageNumberChangeHandler(pageNeighbourAfter + 1);
                          }}
                        >
                          {pageNeighbourAfter + 1}
                        </a>
                      </li>
                    )}
                    {lastPage > pageNeighbourAfter && (
                      <li className="paginate_button page-item ">
                        <a
                          href="#"
                          className="page-link"
                          onClick={() => {
                            pageNumberChangeHandler(lastPage);
                          }}
                        >
                          {lastPage}
                        </a>
                      </li>
                    )}

                    <li
                      className={`paginate_button page-item next ${
                        disableNext ? "disabled" : ""
                      } `}
                    >
                      <a
                        href="#"
                        className="page-link"
                        aria-label="Next"
                        onClick={() => {
                          pageNumberChangeHandler(pageActive + 1);
                        }}
                      >
                        {" "}
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Param
        show={modalData.showModal}
        handleModal={handleModal}
        data={modalData.data}
      />
    </Fragment>
  );
};

export default Params;
