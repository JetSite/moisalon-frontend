const goalIdObjects = (path) => {
  switch (path) {
    case "/[city]":
      return {
        regMaster: "Register as a master_ home page_1",
        moreInfoMaster: "More information_ home page",
        regSalon: "salon_s1",
        moreInfoSalon: "information_s1",
        line: "embark_s1",
        addMaster: "master_s1",
        addSalon: "Place your salon_S1",
        addBrand: "Add your brand_S1",
        review: "feedback_s1",
        order: "Send an order_1",
        newsletter: "mailing_1",
      };
    case "/[city]/master":
      return {
        regMaster: "register master_M2",
        moreInfoMaster: "more information_M2",
        regSalon: "salon_m2",
        moreInfoSalon: "M_information_ m2",
        line: "embark_m2",
        addMaster: "asmaster_M2",
        addSalon: "Place_ salon_M2",
        addBrand: "Add _brand_M2",
        review: "feed_back_M2",
        order: "Send an_M2",
        newsletter: "mailing_m2",
      };
    case "/[city]/salon":
      return {
        regMaster: "Register as a master_ home page_SL4",
        moreInfoMaster: "More information_ SL",
        regSalon: "salon_s1SL",
        moreInfoSalon: "information_SL_P",
        line: "embark_sSL",
        addMaster: "master_s1_PSL",
        addSalon: "Place your salon_PS1",
        addBrand: "Add your brand_S1_SL",
        review: "feedback_s1_SL",
        order: "Send an order_4_V_SL",
        newsletter: "mailing_4SL",
      };
    case "/[city]/brand":
      return {
        regMaster: "as_master_ b_ page_3",
        moreInfoMaster: "More information_ b_ page_3",
        regSalon: "salon_ page_b",
        moreInfoSalon: "information_b3",
        line: "embark_bpage_3",
        addMaster: "master_page_3b",
        addSalon: "your salon_bpage3",
        addBrand: "Add _your_brand_b3",
        review: "feedback_b_ page_31",
        order: "Send an order_b12",
        newsletter: "mailing_b_ page3",
      };
    case "/catalogB2b":
      return {
        newsletter: "mailing_4SL_SL7",
      };
    case "/catalogB2c":
      return {
        newsletter: "mailing_4SL_SL7",
      };
    case "/[city]/beautyFreeShop":
      return {
        newsletter: "mailing_4SL_SL7",
      };

    default:
      return {};
  }
};

export default goalIdObjects;
