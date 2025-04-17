type StationData = {
    stationNo: number;
    colorPantone: string | null;
    lfValue: number | null;
    uvLedIntersity: string | null;
    lpcm: string | null;
    vol: string | null;
  };
  
  type TableColumn = {
    id: string;
    label: string;
  };
  
  type TableRow = {
    stationNo: string;
    [key: string]: string | number;
  };

  export const transformInkCoatingData = (
    apiData: StationData[] | undefined
  ): { columns: TableColumn[]; rows: TableRow[] } => {
    if(!apiData){
      return {rows:[],columns:[]}
    }
    const rowDefinitions: { id: string; key: keyof StationData }[] = [
      { id: "Colour Pantone Code", key: "colorPantone" },
      { id: "LF Value", key: "lfValue" },
      { id: "UV/LedIntersity", key: "uvLedIntersity" },
      { id: "LPCM", key: "lpcm" },
      { id: "Vol.", key: "vol" },
    ];
  
    const rows: TableRow[] = rowDefinitions.map((rowDef) => {
      const row: TableRow = { stationNo: rowDef.id };
      apiData.forEach((station) => {
        const colKey = String(station.stationNo);
        row[colKey] = station[rowDef.key] ?? "--";
      });
      return row;
    });
  
    const columns: TableColumn[] = [
      { id: "stationNo", label: "Station No" },
      ...apiData.map((station) => ({
        id: String(station.stationNo),
        label: String(station.stationNo),
      })),
    ];
  
    return { rows, columns };
  };

type TensionApiResponse = {
    std: {
      unwinder: number;
      infeed: number;
      outfeed: number;
      rewinder: number;
    };
    actuals: {
      unwinder: number;
      infeed: number;
      outfeed: number;
      rewinder: number;
    };
  };
  
  type TensionColumn = { id: string; label: string };
  type TensionRow = { label: string; [key: string]: string | number };

  
  export const transformTensionData = (
    apiData: TensionApiResponse | undefined
  ): { columns: TensionColumn[]; rows: TensionRow[] } => {
    
    const columns: TensionColumn[] = [
      { id: "label", label: "" },
      { id: "unwinder", label: "Unwinder" },
      { id: "infeed", label: "Infeed" },
      { id: "outfeed", label: "Outfeed" },
      { id: "rewinder", label: "Rewinder" },
    ];
    if(!apiData){
        return { columns, rows:[] };
    }
    const rows: TensionRow[] = [
      {
        label: "STD",
        ...apiData.std,
      },
      {
        label: "Actuals",
        ...apiData.actuals,
      },
    ];
  
    return { columns, rows };
  };

  export interface ProcessReportItem {
    particular: string;
    target?: number | string | null;
    rollValues?: Record<string, string | number>; // Optional if some sections don't use it
  }
  
  
 export  type PrintingProcessRow = {
    particular: string;
    target: number | string;
    [key: string]: string | number; // for roll1, roll2 etc.
  };



 export const transformPrintingProcessDataList = (apiDataList: ProcessReportItem[] | undefined): PrintingProcessRow[] => {
    if(!apiDataList){
        return [{ particular: 'Repeat Length', target: 927, roll1: '584', roll2: '88' }]
    }
    return apiDataList.map((item) => {
      const row: PrintingProcessRow = {
        particular: item.particular,
        target: item.target ?? "--"
      };
  
      Object.entries(item.rollValues).forEach(([rollKey, value]) => {
        // Convert keys like "Roll-1" to "roll1"
        const formattedKey = rollKey.toLowerCase().replace(/-/g, '');
        row[formattedKey] = value;
      });
  
      return row;
    });
  };


  export const printingMCMapping = {
    plainFilmWeightPerRepeat: "Plain Film Weight Per Repeat",
    printedFilmWeightPerRepeat: "Printed Film Weight Per Repeat",
    inkWeightPerRepeat: "Ink Weight Per Repeat",
    printingMCName: "Printing M/C Name",
    leftOverRollMeters: "Left Over Roll Meters",
    leftOverRollKgs: "Left Over Roll Kg’s",
    operator: "Operator",
    shiftQc: "Shift Qc",
    supervisor: "Supervisor",
    remarks: "Remarks"
  };

  export const transformPrintingMCData = (apiData) => {
    return Object.entries(printingMCMapping).map(([key, label]) => ({
      label,
      value: apiData[key] ?? "--" // fallback if value is null or undefined
    }));
  };
  
  
  