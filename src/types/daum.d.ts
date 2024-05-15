declare namespace daum {
  class Postcode {
    constructor(options: { oncomplete: (data: daum.PostcodeData) => void });
    open(): void;
  }
  type PostcodeData = {
    address: string;
    addressType: 'R' | 'J'; // 'R'은 도로명 주소, 'J'는 지번 주소
    bname: string; // 지번
    buildingName: string; // 건물명
  };
}
