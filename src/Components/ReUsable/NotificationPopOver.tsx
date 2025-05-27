import React from "react";
import { Popover, Typography, Box, Divider, List, Stack } from "@mui/material";
import { CheckCircle, Error, Inbox } from "@mui/icons-material";

interface Notification {
  filename: string;
  status: "success" | "error";
  message: string;
  processedOn: string;
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
          mt: 6,
          ml: -3,
          borderRadius: 2,
          p: 2,
          width: 420,
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        {popUpTitle}
      </Typography>
      <Divider />

      {notifications.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Inbox fontSize="large" color="disabled" />
          <Typography variant="body2" color="text.secondary">
            No notifications
          </Typography>
        </Box>
      ) : (
        <List disablePadding>
          {notifications.map((notif, index) => (
            <Box key={index}>
              <Box
                onClick={() => onClickNotification(index)}
                sx={{
                  px: 1,
                  py: 1.5,
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
                    {notif.status === "success" ? (
                      <CheckCircle color="success" fontSize="small" />
                    ) : (
                      <Error color="error" fontSize="small" />
                    )}
                  </Box>

                  {/* Text Column */}
                  <Box flex={1}>
                    <Typography fontWeight="bold" fontSize="14px">
                      {notif.filename}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {notif.message}
                    </Typography>
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

              {index !== notifications.length - 1 && <Divider sx={{ my: 1 }} />}
            </Box>
          ))}
        </List>
      )}
    </Popover>
  );
};

export default NotificationPopover;
