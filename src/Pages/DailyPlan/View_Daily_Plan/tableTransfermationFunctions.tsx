import { formatDate } from "../../../Components/helpers";
import { InfoItem } from "../../../Components/ReUsable/InfoContainer";
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
    edit: boolean;
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
        row[colKey] = station[rowDef.key] ?? "";
      });
      return row;
    });
  
    const columns: TableColumn[] = [
      { id: "stationNo", label: "Station No" , edit: false },
      ...apiData.map((station) => ({
        id: String(station.stationNo),
        label: String(station.stationNo),
        edit:false
      })),
    ];
  
    return { rows, columns };
  };

type TensionApiResponse = {
    std: {
      unwinder: number| null;
      infeed: number;
      outfeed: number;
      rewinder: number;
    };
    actuals: {
      unwinder: number | null;
      infeed: number | null;
      outfeed: number | null;
      rewinder: number | null;
    };
  };
  
  type TensionColumn = { id: string; label: string;editIcon:boolean };
  type TensionRow = { label: string;  edit?: boolean;
    [key: string]: string | number | boolean | undefined | null;  };

  
  export const transformTensionData = (
    apiData: TensionApiResponse | undefined
  ): { columns: TensionColumn[]; rows: TensionRow[] } => {
    
    const columns: TensionColumn[] = [
      { id: "label", label: "",editIcon:false },
      { id: "unwinder", label: "Unwinder",editIcon:false },
      { id: "infeed", label: "Infeed",editIcon:false },
      { id: "outfeed", label: "Outfeed",editIcon:false },
      { id: "rewinder", label: "Rewinder",editIcon:false },
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
        edit:true,
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
        target: item.target ?? ""
      };
      Object.entries(item.rollValues ?? {}).forEach(([rollKey, value]) => {
        const formattedKey = rollKey;
        row[formattedKey] = value;
      });
      return row;
    });
  };

export const revertPrintingProcessData = (uiData: any[]): ProcessReportItem[] => {
  return uiData.map((item) => {
    const { particular, target, ...rest } = item;

    // Extract all roll keys dynamically, e.g., "Roll-1", "Roll-2", ...
    const rollValues: Record<string, string | number> = {};
    Object.keys(rest).forEach((key) => {
      if (key.startsWith("Roll-")) {
        rollValues[key] = rest[key];
      }
    });

    return {
      particular,
      target: target === "" ? null : target,
      rollValues,
    };
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

  export const transformPrintingMCData = (apiData:any) => {
    if(!apiData) return []
    return Object.entries(printingMCMapping)?.map(([key, label]) => ({
      label,
      value: apiData[key] ?? "" // fallback if value is null or undefined
    }));
  };


  //--------------------TravelCard------------//

  type JobDetailsApiResponse = {
    jobStartingTime: string;
    completionTime: string;
    totalPrintingTime: string;
    operator: string;
    supervisor: string;
    hod: string;
  };
  
  export const transformJobDetails = (
    data: JobDetailsApiResponse | undefined,
    makeEditable: boolean = false
  ): InfoItem[] => {
    if (!data) return [];
  
    return [
      {
        label: "Job Starting Time",
        value: formatDate(data.jobStartingTime),
        editable: makeEditable,
        keyName: "jobStartingTime",
        type: "date",
      },
      {
        label: "Completion Time",
        value: formatDate(data.completionTime),
        editable: makeEditable,
        keyName: "completionTime",
        type: "date",
      },
      {
        label: "Total Printing Time",
        value: data.totalPrintingTime || "",
        editable: makeEditable,
        keyName: "totalPrintingTime",
      },
      {
        label: "Operator",
        value: data.operator || "",
        editable: makeEditable,
        keyName: "operator",
      },
      {
        label: "Supervisor",
        value: data.supervisor || "",
        editable: makeEditable,
        keyName: "supervisor",
      },
      {
        label: "HOD",
        value: data.hod || "",
        editable: makeEditable,
        keyName: "hod",
      },
    ];
  };

  //-----------------------------Lamination Report---------------------//

  type ZoneTempApiResponse = {
    zone1TempStd?: number;
    zone1TempActual?: number;
    zone2TempStd?: number;
    zone2TempActual?: number;
    nipPressureStd?: number;
    nipPressureActual?: number;
    speedMtrMinStd?: number;
    speedMtrMinActual?: number;
  } | undefined;
  
  type ZoneTempPressingRow = {
    particular: string;
    zone1: string;
    zone2: string;
    nipPressure: string;
    speed: string;
  };
  
  export const transformZoneTempData = (data: ZoneTempApiResponse): ZoneTempPressingRow[] => {
    const getValue = (value?: number): string => (value !== undefined && value !== null ? String(value) : '');
  
    return [
      {
        particular: "STD",
        zone1: getValue(data?.zone1TempStd),
        zone2: getValue(data?.zone2TempStd),
        nipPressure: getValue(data?.nipPressureStd),
        speed: getValue(data?.speedMtrMinStd),
      },
      {
        particular: "Actual",
        zone1: getValue(data?.zone1TempActual),
        zone2: getValue(data?.zone2TempActual),
        nipPressure: getValue(data?.nipPressureActual),
        speed: getValue(data?.speedMtrMinActual),
      },
    ];
  };

  type UnwindRewindApiResponse = {
    priLaminatedStd?: string;
    secUnwinderStd?: string;
    lamiSetStd?: string;
    rewinderStd?: string;
    priLaminatedActual?: string;
    secUnwinderActual?: string;
    lamiSetActual?: string;
    rewinderActual?: string;
  } | undefined;
  
  type UnwindRewindRow = {
    particular: string;
    priLaminated: string;
    secUnwinder: string;
    lamiSet: string;
    rewinder: string;
  };
  
  export const transformUnwindRewindData = (
    data: UnwindRewindApiResponse
  ): UnwindRewindRow[] => {
    const getVal = (val?: string): string => (val !== undefined && val !== null ? val : '');
  
    return [
      {
        particular: 'STD',
        priLaminated: getVal(data?.priLaminatedStd),
        secUnwinder: getVal(data?.secUnwinderStd),
        lamiSet: getVal(data?.lamiSetStd),
        rewinder: getVal(data?.rewinderStd),
      },
      {
        particular: 'Actual',
        priLaminated: getVal(data?.priLaminatedActual),
        secUnwinder: getVal(data?.secUnwinderActual),
        lamiSet: getVal(data?.lamiSetActual),
        rewinder: getVal(data?.rewinderActual),
      },
    ];
  };

  type LaminationFilmApiResponse = {
    priLaminatedWidth?: number | string;
    priLaminatedThicknessMicrons?: number | string;
    priLaminatedGsm?: number | string;
    priLaminatedDyne?: number | string;
    secUnwinderWidth?: number | string;
    secUnwinderThicknessMicrons?: number | string;
    secUnwinderGsm?: number | string;
    secUnwinderDyne?: number | string;
  } | undefined;
  
  type LaminationFilmRow = {
    spec: string;
    priLaminated: string;
    secUnwinder: string;
  };
  
  export const transformLaminationFilmData = (
    data: LaminationFilmApiResponse
  ): LaminationFilmRow[] => {
    const getVal = (val?: string | number): string => 
      val !== undefined && val !== null ? String(val) : '';
  
    return [
      {
        spec: 'Width',
        priLaminated: getVal(data?.priLaminatedWidth),
        secUnwinder: getVal(data?.secUnwinderWidth),
      },
      {
        spec: 'Thickness (Microns)',
        priLaminated: getVal(data?.priLaminatedThicknessMicrons),
        secUnwinder: getVal(data?.secUnwinderThicknessMicrons),
      },
      {
        spec: 'GSM',
        priLaminated: getVal(data?.priLaminatedGsm),
        secUnwinder: getVal(data?.secUnwinderGsm),
      },
      {
        spec: 'DYNE',
        priLaminated: getVal(data?.priLaminatedDyne),
        secUnwinder: getVal(data?.secUnwinderDyne),
      },
    ];
  };

  type PlainFilmApiResponse = {
    plainFilmLeftOverRollMeters?: string | number;
    plainFilmLeftOverRollKgs?: string | number;
    qcApproval?: string;
    inchargeComments?: string;
  } | undefined;
  
  type PlainFilmInfoItem = {
    label: string;
    value: string;
  };
  
  export const transformPlainFilmInfo = (
    data: PlainFilmApiResponse
  ): PlainFilmInfoItem[] => {
    const getVal = (val?: string | number): string =>
      val !== undefined && val !== null && val !== '' ? String(val) : '';
  
    return [
      {
        label: 'Plain Film Left Over Roll(meters)',
        value: getVal(data?.plainFilmLeftOverRollMeters),
      },
      {
        label: 'Plain Film Left Over Roll(Kgs)',
        value: getVal(data?.plainFilmLeftOverRollKgs),
      },
      {
        label: 'QC Approval',
        value: getVal(data?.qcApproval),
      },
      {
        label: 'Incharge comments',
        value: getVal(data?.inchargeComments),
      },
    ];
  };
  
  
  
  
  