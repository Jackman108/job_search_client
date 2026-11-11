import {
    getManagementControlState,
    type ManagementControlState,
    type ManagementControlStateArgs,
} from '@shared/utils/managementControlState.utils';

/** Stable wrapper around the New/Save/Edit/Delete enablement matrix. */
const useManagementControlState = (args: ManagementControlStateArgs): ManagementControlState =>
    getManagementControlState(args);

export default useManagementControlState;
