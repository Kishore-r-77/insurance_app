export type pAStateType = {
    CompanyID: string;
    ClientID: string;
    addOpen: boolean;
    editOpen: boolean;
    infoOpen: boolean;
    clientOpen: boolean;
    searchString: string;
    searchCriteria: string;
    sortColumn: string;
    sortAsc: boolean;
    sortDesc: boolean;
  };
  
  export type ActionConstantsType = {
    ONCHANGE: string;
    EDITCHANGE: string;
    ADDOPEN: string;
    EDITOPEN: string;
    INFOOPEN: string;
    ADDCLOSE: string;
    EDITCLOSE: string;
    INFOCLOSE: string;
    CLIENTOPEN: string;
    CLIENTCLOSE: string;
    SORT_ASC: string;
    SORT_DESC: string;
  };
  
  export type PauthType = {
    state: pAStateType;
    record: any;
    dispatch: React.Dispatch<any>;
    handleFormSubmit: () => Promise<void>;
    ACTIONS: ActionConstantsType;
  };
  