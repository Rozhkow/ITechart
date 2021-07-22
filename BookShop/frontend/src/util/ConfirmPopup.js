import { Confirm } from "semantic-ui-react";

export const ConfirmPopup = ({ children, ...props }) => (
    <>
        <Confirm {...props} />
        {children}
    </>
)