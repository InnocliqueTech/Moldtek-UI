import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  SelectChangeEvent,
  Tooltip,
  IconButton,
} from "@mui/material";
import Cards from "../../Components/ReUsable/Cards";
import { InfoOutline, Edit } from "@mui/icons-material";
import ReusableTable from "../../Components/ReUsable/Table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { toast } from "react-toastify";
import {
  useGetUsersMutation,
  useDeactivateUserMutation,
  useGetUserMetricsQuery,
  useUserDataGlobalMutationMutation,
} from "../../store/apis/manageUsersApi";
import { Switch, FormControlLabel } from "@mui/material";
import { CheckCircleOutline, HighlightOff } from "@mui/icons-material";
import {
  setDebouncedSearchUser,
  setIsSearchTriggered,
} from "../../store/slices/userSlice";
import ConfirmPopup from "../../Components/ReUsable/ConfirmPopup";

const Users: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    filtersPayload,
    debouncedSearchUser,
    isSearchTriggered,
    openSliderUser,
  } = useSelector((state: RootState) => state.user);

  const storageKey = "userDataPage";
  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem(storageKey);
    return savedPage !== null ? Number(savedPage) : 0;
  });
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserStatus, setSelectedUserStatus] = useState(false);
  const [actionText, setActionText] = useState("");
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const rowsPerPageStorageKey = "userDataRowsPerPage";
  const [rowsPerPage, setRowsPerPage] = useState(() => {
    const savedPage = localStorage.getItem(rowsPerPageStorageKey);
    return savedPage !== null ? Number(savedPage) : 10;
  });
  const previousPage = localStorage.getItem("PreviousPageUser");

  const { data, isLoading: metricsLoading } = useGetUserMetricsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const widgetsData = [
    {
      title: "Total Users",
      value: data?.data?.totalUsers || 0,
      infoText: "Displays the count of total users",
    },
    {
      title: "Total Active Users",
      value: data?.data?.activeUsers || 0,
      infoText: "Displays the total count of Active users",
    },
    {
      title: "Total Inactive Users",
      value: data?.data?.inactiveUsers || 0,
      infoText: "Displays the total count of InActive users",
    },
  ];



  const columns = [
    {
      id: "firstName",
      label: "First Name",
      align: false,
      disableSorting: false,
      format: (value: string) => value,
    },
    {
      id: "lastName",
      label: "Last Name",
      align: false,
      disableSorting: false,
      format: (value: string) => value,
    },
    {
      id: "email",
      label: "Email",
      align: false,
      disableSorting: false,
      format: (value: string) => value,
    },
    {
      id: "phoneNumber",
      label: "Phone Number",
      align: false,
      disableSorting: false,
      format: (value: string) => value,
    },
    {
      id: "userTypeName",
      label: "Role",
      align: false,
      disableSorting: false,
      format: (value: string) => value,
    },
    {
      id: "createdDate",
      label: "Created Date",
      align: false,
      disableSorting: false,
      format: (value: string) =>
        value
          ? new Date(value).toISOString().split("T")[0].replace(/-/g, "-")
          : "N/A",
    },
    {
      id: "active",
      label: "Status",
      align: false,
      disableSorting: false,
      format: (value: boolean, row: any) => (
        <FormControlLabel
          control={
            <Switch
              checked={value}
              onChange={(e) => handleStatusChange(row.id, e.target.checked)}
              color="primary"
            />
          }
          label={
            value ? (
              <span style={{ display: "flex", alignItems: "center" }}>
                <CheckCircleOutline
                  style={{ color: "green", marginRight: 4 }}
                />
                Active
              </span>
            ) : (
              <span style={{ display: "flex", alignItems: "center" }}>
                <HighlightOff style={{ color: "red", marginRight: 4 }} />
                Inactive
              </span>
            )
          }
        />
      ),
    },
  ];
  const storedEmail = localStorage.getItem("email") || "";
  const handleStatusChange = (id: string, newStatus: boolean) => {
    setSelectedUserId(id);
    setSelectedUserStatus(newStatus);
    setActionText(newStatus ? "Activate" : "DeActivate");

    setOpenConfirm(true);
  };

  const handleSubmitPopupClose = () => {
    setOpenConfirm(false);
    setSelectedUserId("");
    setSelectedUserStatus(false);
    setActionText("");
  };

  

  const [getUsers, { data: userslistOfData, isLoading }] =
    useGetUsersMutation();

  const handleSubmitPopupConfirmOpen = async () => {
    setIsConfirmLoading(true);
    try {
      await deactivateUser({
        userId: selectedUserId,
        isActive: selectedUserStatus,
      }).unwrap();

      getUsers({
        ...filtersPayload,
        email: storedEmail,
        page: isSearchTriggered ? 0 : page,
        size: rowsPerPage,
      });

      toast.success(
        `User ${selectedUserStatus ? "Activated" : "DeActivated"} successfully`
      );
    } catch (error) {
      toast.error("Failed to update user.");
    } finally {
      setIsConfirmLoading(false);
      handleSubmitPopupClose();
    }
  };

  const [deactivateUser] = useDeactivateUserMutation();

  const baseActions = [
    {
      icon: (
        <Tooltip title="Update" arrow>
          <IconButton size="small" color="primary">
            <Edit fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
      onClick: (row: any) => {
        dispatch(setDebouncedSearchUser(""))
        navigate("/update-user", { state: { rowData: row } });
      },
    },
  ];

  const [
    userDataGlobalSearch,
    { data: globalSearchData, isLoading: searchLoading },
  ] = useUserDataGlobalMutationMutation();

  useEffect(()=>{
dispatch(setDebouncedSearchUser(""))
  },[])

  console.log(debouncedSearchUser,openSliderUser,"DEBOUNCEDSEARCHUSER")

  useEffect(() => {
    if (debouncedSearchUser === "" && !openSliderUser) {
      getUsers({
        ...filtersPayload,
        email: storedEmail,
        page: isSearchTriggered ? 0 : page,
        size: rowsPerPage,
      });
    }
    if (isSearchTriggered) {
      setPage(0);
    }
  }, [page, openSliderUser, filtersPayload, rowsPerPage]);

  useEffect(() => {
    if (debouncedSearchUser !== "") {
      localStorage.setItem("PreviousPageUser", page.toString());
      setPage(0);
    } else {
      setPage(Number(previousPage));
    }
  }, [debouncedSearchUser]);

  useEffect(() => {
    if (debouncedSearchUser !== "" && !openSliderUser) {
      userDataGlobalSearch({
        page: page,
        size: rowsPerPage,
        searchField: debouncedSearchUser,
      });
    }
  }, [page, rowsPerPage, debouncedSearchUser, openSliderUser]);
  useEffect(() => {
    localStorage.setItem(storageKey, page.toString());
    localStorage.setItem(rowsPerPageStorageKey, rowsPerPage.toString());
  }, [page, rowsPerPage]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    dispatch(setIsSearchTriggered(false));
    localStorage.setItem(storageKey, newPage.toString());
  };

  const transformedData = userslistOfData?.data?.map((row: any) => ({
    ...row,
    // userTypeName: row.userType?.userTypeName ?? "N/A",
  }));

  const transformedSearchData = globalSearchData?.data?.map((row: any) => ({
    ...row,
    // createdDate: row.createdDate,
    // phoneNumber: row.phoneNumber,
    // userTypeName: row.userTypeName ?? "N/A",
  }));
  const handleRowsPerPageChange = (event: SelectChangeEvent<string>): void => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
    localStorage.setItem(rowsPerPageStorageKey, rowsPerPage.toString());
  };

  return (
    <Box sx={{ p: 0 }}>
      <Grid container spacing={1}>
        {widgetsData &&
          widgetsData?.map((widget, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <Cards
                title={widget.title}
                value={widget.value}
                icon={
                  <InfoOutline
                    sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
                  />
                }
                isLoading={metricsLoading}
                infoText={widget.infoText}
              />
            </Grid>
          ))}
      </Grid>

      <Box sx={{ paddingTop: 1.5 }}>
        <ReusableTable
          infoText={
            "Displays a list of master data entries with their associated SKU information."
          }
          boxShadow={true}
          columns={columns}
          pageNumber={page}
          data={
            debouncedSearchUser
              ? transformedSearchData ?? []
              : transformedData ?? []
          }
          // data={userslistOfData?.data || []}
          selectable={false}
          // label={`${userslistOfData?.totalRecords || 0} Users`}
          label={`${
            debouncedSearchUser
              ? globalSearchData?.totalRecords ?? 0
              : userslistOfData?.totalRecords ?? 0
          } Users`}
          title="Overview"
          info={true}
          searchVisible={true}
          action={true}
          actions={baseActions}
          isLoading={isLoading || searchLoading}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          id={"userData"}
          totalLength={
            debouncedSearchUser
              ? globalSearchData?.totalRecords ?? 0
              : userslistOfData?.totalRecords ?? 0
          }
          // totalLength={userslistOfData?.totalRecords || 0}
          pageRange={true}
          handleRowsPerPageChange={handleRowsPerPageChange}
        />
      </Box>

      <ConfirmPopup
        open={openConfirm}
        title={`Are you sure you want to ${actionText} this user?`}
        message={``}
        buttonText="Cancel"
        buttonText2={actionText}
        gifSrc=""
        onClose={handleSubmitPopupClose}
        onClick={handleSubmitPopupConfirmOpen}
        isLoading={isConfirmLoading}
        popUpClosed={false}
      />
    </Box>
  );
};

export default Users;
