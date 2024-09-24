export interface GetTourSpotsDTO {
  status: string;
  data: {
    contentId: string;
    contentTypeId: string;
    title: string;
    sigunguCode: string;
  };
}

export interface GetTourSpotContentDTO {
  status: string;
  data: {
    contentId: string;
    contentTypeId: string;
    title: string;
    tel: string;
    homepageUrl: string;
    firstImage: string;
    secondImage: string;
    addr1: string;
    addr2: string;
    mapx: string;
    mapy: string;
    mlevel1: string;
    overview: string;
  };
}
