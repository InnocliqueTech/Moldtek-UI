import React from "react";
import { Popover, Typography, Box, Divider, List, Stack } from "@mui/material";
import { CheckCircle, Error, Inbox } from "@mui/icons-material";

interface Notification {
  fileName: string;
  fileReadStatus: string;
  processedOn: string;
  exceptionMessage: string | null;
  unitEffectiveNumbers: string;
  id: number;
}

interface NotificationPopoverProps {
  notifications: Notification[];
  open: boolean;
  onClose: () => void;
  popUpTitle: string;
  onClickNotification: (index: number) => void;
}

const NotificationPopover: React.FC<NotificationPopoverProps> = ({
  notifications,
  open,
  onClose,
  popUpTitle,
  onClickNotification,
}) => {

console.log(notifications,"NOTIFICATIONSOFDAILYPLAN")

const isEmptyNotification = (notif: Notification) =>
  !notif.fileName &&
  !notif.fileReadStatus &&
  !notif.processedOn &&
  !notif.unitEffectiveNumbers &&
  !notif.exceptionMessage;

const validNotifications = notifications?.filter(n => !isEmptyNotification(n)) ?? [];


  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        sx: {
          mt: { xs: 2, sm: 6 }, // smaller top margin on small screens
          ml: { xs: 0, sm: -3 }, // no negative margin on mobile
          borderRadius: 2,
          p: 1,
          width: { xs: "90vw", sm: 420 }, // responsive width
          maxHeight: "88vh", // scroll if too tall
          overflow: "auto", // allow scroll
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        {popUpTitle}
      </Typography>
      <Divider />

      {(notifications?.length ?? 0) === 0 || validNotifications.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Inbox fontSize="large" color="disabled" />
          <Typography variant="body2" color="text.secondary">
            No notifications
          </Typography>
        </Box>
      ) : (
        <List disablePadding>
          {notifications.map((notif, index) => (
            <Box key={notif.id}>
              <Box
                onClick={() => onClickNotification(index)}
                sx={{
                  px: 0,
                  py: 0.5,
                  borderRadius: 2,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f1f1f1",
                  },
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  {/* Icon Centered */}
                  <Box>
                    {notif.fileReadStatus === "Success" ? (
                      <CheckCircle color="success" fontSize="small" />
                    ) : (
                      <Error color="error" fontSize="small" />
                    )}
                  </Box>

                  {/* Text Column */}
                  <Box flex={1}>
                    <Typography fontWeight="bold" fontSize="14px">
                      {notif.fileName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {notif.fileReadStatus === "Success" &&
                        "File Processed Successfully"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      UnitEffective Numbers:{" "}
                      <Box
                        component="span"
                        sx={{ fontWeight: "bold", color: "primary.main" }}
                      >
                        {notif.unitEffectiveNumbers?notif.unitEffectiveNumbers:'N/A'}
                      </Box>
                    </Typography>
                    {notif.fileReadStatus === "Failed" &&
                      notif.exceptionMessage && (
                        <Typography
                          variant="body2"
                          color="error"
                          sx={{ mt: 0.5 }}
                        >
                          {notif.exceptionMessage}
                        </Typography>
                      )}
                    <Typography variant="caption" color="text.disabled">
                      {new Date(notif.processedOn).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </Typography>
                  </Box>

                  {/* Time Centered */}
                  <Box textAlign="right">
                    <Typography variant="caption" color="text.disabled">
                      {new Date(notif.processedOn).toLocaleTimeString(
                        undefined,
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {index !== notifications.length - 1 && <Divider sx={{ my: 0 }} />}
            </Box>
          ))}
        </List>
      )}
    </Popover>
  );
};

export default NotificationPopover;
