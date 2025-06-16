import { useState, useEffect } from "react";
import { Box, Grid, SelectChangeEvent, Tooltip, IconButton } from "@mui/material";
import Cards from '../../Components/ReUsable/Cards';
import { InfoOutline, Delete, Edit } from "@mui/icons-material";
import ReusableTable from "../../Components/ReUsable/Table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { toast } from 'react-toastify';
import { useGetUsersMutation, useDeactivateUserMutation, useGetUserMetricsQuery } from "../../store/apis/manageUsersApi";
import { Switch, FormControlLabel } from '@mui/material';
import { CheckCircleOutline, HighlightOff } from '@mui/icons-material';
import { setIsSearchTriggered } from "../../store/slices/userSlice";



const Users: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { filtersPayload, debouncedSearchUser, isSearchTriggered, openSliderUser } = useSelector(
        (state: RootState) => state.user
    )




    const storageKey = "userDataPage";
    const [page, setPage] = useState(() => {
        const savedPage = localStorage.getItem(storageKey);
        return savedPage !== null ? Number(savedPage) : 0;
    });
    const [previousPage, setPreviousPage] = useState(0);
    const rowsPerPageStorageKey = "userDataRowsPerPage";
    const [rowsPerPage, setRowsPerPage] = useState(() => {
        const savedPage = localStorage.getItem(rowsPerPageStorageKey);
        return savedPage !== null ? Number(savedPage) : 10;
    });

    const {data} = useGetUserMetricsQuery()
    console.log("useGetUserMetricsQuery", data)
    const widgetsData = [
        {
            title: "Total Users",
            value: data?.data?.totalUsers || 0,
            infoText:
                "Displays the count of total users",
        },
        {
            title: "Total Active Users",
            value: data?.data?.activeUsers || 0,
            infoText:
                "Displays the total count of active users",
        },
        {
            title: "Total Inactive Users",
            value: data?.data?.inactiveUsers || 0,
            infoText:
                "Displays the total count of inactive users",
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
                    ? new Date(value).toLocaleDateString("en-GB").replace(/\//g, "-")
                    : "N/A",
        },
        {
        id: "status",
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
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            <CheckCircleOutline style={{ color: 'green', marginRight: 4 }} />
                            Active
                        </span>
                    ) : (
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            <HighlightOff style={{ color: 'red', marginRight: 4 }} />
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
     handleDeactivate(id);
     console.log({ id, newStatus }, "inside new Status");
   };

    const [getUsers, { data: userslistOfData, isLoading }] = useGetUsersMutation();


    // const [getUsers, { data: userslistOfData, isLoading }] = useGetUsersMutation(
    //     //     {
    //     //     email: "admin@example.com",
    //     //     roles: [],
    //     //     fromDate: "",
    //     //     toDate: "",
    //     //     page: page,
    //     //     size: rowsPerPage,
    //     // }
    // );
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
                console.log(row)
                navigate('/update-user', { state: { rowData: row } })
            },
        },
        // {
        //     icon: (
        //         <Tooltip title="Delete" arrow>
        //             <IconButton size="small" color="error">
        //                 <Delete fontSize="small" />
        //             </IconButton>
        //         </Tooltip>
        //     ),
        //     onClick: (row: any) => {
        //         console.log(row.userId)

        //     },
        // },
    ];
    // useEffect(() => {
    //     // fetchUsers();
    //     getUsers({
    //     ...filtersPayload,
    //     page: isSearchTriggered ? 0 : page,
    //     size: rowsPerPage,
    //   });
    // }, [page, rowsPerPage, isSearchTriggered, filtersPayload, ]);

      useEffect(() => {
        if (!openSliderUser) {
          getUsers({
            ...filtersPayload,
            email:storedEmail,
            page: isSearchTriggered ? 0 : page,
            size: rowsPerPage,
          });
        }
        if (isSearchTriggered) {
          setPage(0);
        }
      }, [page, openSliderUser, filtersPayload, rowsPerPage]);


    useEffect(() => {
        localStorage.setItem(storageKey, page.toString());
        localStorage.setItem(rowsPerPageStorageKey, rowsPerPage.toString());
    }, [page, rowsPerPage]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
         dispatch(setIsSearchTriggered(false));
        localStorage.setItem(storageKey, newPage.toString());
    };


    const handleRowsPerPageChange = (event: SelectChangeEvent<string>): void => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
        localStorage.setItem(rowsPerPageStorageKey, rowsPerPage.toString());
    };

    const handleDeactivate = async (userId: string) => {
      try {
        await deactivateUser(userId).unwrap();
        toast.success("User deactivated successfully");
      } catch (error) {
        toast.error("Failed to deactivate user");
      }
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
                                // isLoading={isLoading}
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
                    data={userslistOfData?.data?.map((item:any,index:number)=>({...item,status:index%2 == 0 ? true : false})) || []}

                    selectable={false}
                    label={`${userslistOfData?.totalRecords || 0
                        } Users`}
                    title="Overview"
                    info={true}
                    searchVisible={true}
                    action={true}
                    actions={baseActions}
                    isLoading={isLoading}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    id={"userData"}
                    totalLength={userslistOfData?.totalRecords || 0}
                    pageRange={true}
                    handleRowsPerPageChange={handleRowsPerPageChange}
                />

            </Box>
        </Box>
    )
}

export default Users;