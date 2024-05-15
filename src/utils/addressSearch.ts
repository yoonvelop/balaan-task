import { loadScript } from './loadScript';

const KAKAO_POSTCODE_SCRIPT_ID = 'kakao-postcode-script';
type AddressUpdate = (address: string) => void;
export const openPostcodeModal = (updateAddress: AddressUpdate): void => {
  const scriptUrl =
    'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  loadScript(KAKAO_POSTCODE_SCRIPT_ID, scriptUrl, () => {
    new window.daum.Postcode({
      oncomplete: (data: daum.PostcodeData) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress +=
              extraAddress !== ''
                ? `, ${data.buildingName}`
                : data.buildingName;
          }
          fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
        updateAddress(fullAddress);
      },
    }).open();
  });
};
