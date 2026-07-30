export const STEPS = [
  {
    id: 'voltage',
    label: 'Select Voltage',
    desc: 'Choose your voltage standard (IEC or UL), then select the input voltage.',
  },
  {
    id: 'power',
    label: 'Select Power Rating',
    desc: 'Choose a unit first, then select a power rating.',
  },
  {
    id: 'type',
    label: 'Select Type',
    desc: 'Choose the drive platform.',
  },
  {
    id: 'emi',
    label: 'Select EMI Option',
    desc: 'Select the electromagnetic interference filter configuration.',
  },
  {
    id: 'heatsink',
    label: 'Select Heatsink',
    desc: 'Select the cooling and mounting configuration.',
  },
  {
    id: 'overload',
    label: 'Select Overload Characteristic',
    desc: 'Select the rated switching frequency.',
  },
  {
    id: 'control',
    label: 'Select Control Board',
    desc: 'Select the control and communication interface.',
  },
]

export const VOLT_COL_MAP = { IEC: 'Voltage_IEC', UL: 'Voltage_UL' }
export const POWER_COL_MAP = { KW: 'Power_KW', HP: 'Power_HP' }

export const POWER_UNITS = [
  { key: 'KW', display: 'kW' },
  { key: 'HP', display: 'Hp' },
]

export const SPEC_COLUMNS = [
  'Type',
  'Heatsink',
  'Voltage_IEC',
  'Voltage_UL',
  'EMI',
  'Power_KW',
  'Power_HP',
  'Irated_IEC_A',
  'Irated_UL_A',
  'I_OC_A',
  'I_OL_A',
  'I_OC_%',
  'I_OL_%',
  'Rated_kHz',
  'Max_kHz',
  'Ctrl_Board',
]
