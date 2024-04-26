import { AppRootStateType } from "app/store/store";

export const selectCaptcha = (state: AppRootStateType) => state.auth.captchaUrl;
