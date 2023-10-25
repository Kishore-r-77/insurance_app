export type PremiumStateType = {
    FromDate: string;
    ToDate : string;
    FromPolicy: string;
    ToPolicy: string;
    addOpen: boolean;
    searchString: string;
    searchCriteria: string;
    sortColumn: string;
    sortAsc: boolean;
    sortDesc: boolean;
  };
  
  export type ActionConstantsType = {
    ONCHANGE: string;
    ADDOPEN: string;
    ADDCLOSE: string;
    SORT_ASC: string;
    SORT_DESC: string;
  };
  export type PremiumModalType = {
    state: PremiumStateType;
    record: any;
    dispatch: React.Dispatch<any>;
    handleFormSubmit: () => Promise<void>;
    ACTIONS: ActionConstantsType;
  };
  