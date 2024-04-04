export interface UserInfo {
  idUser: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  hasVerifiedEmail: boolean;
  birthday: string;
  address: string;
  citizenIdentification: string;
  visa: string;
  nationality: string;
  workingBranch: string;
  phoneNumber: string;
  hasVerifiedPhone: boolean;
  avatar: string;
  colorAvatar: string;
  defaultAvatar: string;
  newUser: boolean;
  listRole: string[];
  dateInserted: string;
  dateUpdated: string;
  insertedByUser: string;
  languageID: string;
  taxCode: string;
  totalBank: string;
  totalCommodity: string;
  totalCurrency: string;
  totalFee: string;
  // totalFeeGroup: string; //
  totalLocation: string;
  totalTypeContainer: string;
  totalTypeFeeGroup: string;
  totalTypeLocation: string;
  totalUnit: string;
  updatedByUser: string;
  userID: string;
  note: string;
  partnerID: string;

  totalAirPricing: string;
  totalAirQuotation: string;
  totalBookingCancelled: string;
  totalBookingCompleted: string;
  totalBookingPending: string;
  totalBookingProcessing: string;
  totalCustomsPricing: string;
  totalCustomsQuotation: string;
  totalLoadCapacity: string;
  totalOtherChargesGroupPricing: string;
  totalOtherChargesGroupQuotation: string;
  totalPartner: string;
  totalSeaPricing: string;
  totalSeaQuotation: string;
  totalStaff: string;
  totalTruckingPricing: string;
  totalTruckingQuotation: string;
  totalTypeCustoms: string;
  totalTypeFee: string;
  totalTypeOfLoadCapacity: string;
  totalTypeUnit: string;
  totalBookingRequest: string;
}
