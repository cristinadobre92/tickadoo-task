import { mainTexts } from "../main.texts.ts";
import "./logoutDialog.css";
import { MainButton } from "../Components/MainButton.tsx";

export function LogoutDialog({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div
            className="logout-dialog modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-dialog-title"
            tabIndex={-1}
        >
            <h2 id="logout-dialog-title" className="logout-dialog__title">
                {mainTexts.logout}
            </h2>
            <div className="logout-dialog__message">
                {mainTexts.logoutNotImplemented}
            </div>
            <MainButton type="button" onClick={onClose}>
                {mainTexts.ok}
            </MainButton>
        </div>
    );
}