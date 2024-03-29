import { AddRoutes, IRoute } from "../interfaces/index.js";
import { Express } from "express";
import V1 from "./v1/index.js";
export const routes: IRoute[] = [
  {
    url: "/api/v1/auctioner-order-total",
    route: V1.auctionerOrderTotalRoute,
  },
  {
    url: "/api/v1/auctioner-order",
    route: V1.auctionerOrderRoute,
  },
  {
    url: "/api/v1/oc-country",
    route: V1.ocCountryRoute,
  },
  {
    url: "/api/v1/lounge-post-views",
    route: V1.loungePostViewsRoute,
  },
  {
    url: "/api/v1/auction-likes",
    route: V1.auctionLikesRoute,
  },
  {
    url: "/api/v1/oc-delivery-charge",
    route: V1.ocDeliveryChargeRoute,
  },
  {
    url: "/api/v1/auction",
    route: V1.auctionRoute,
  },
  {
    url: "/api/v1/auth",
    route: V1.authRoute,
  },
  {
    url: "/api/v1/condition",
    route: V1.conditionRoute,
  },
  {
    url: "/api/v1/oc-customer",
    route: V1.ocCustomerRoute,
  },
  {
    url: "/api/v1/oc-product-brand",
    route: V1.ocProductBrandRoute,
  },
  {
    url: "/api/v1/auction-side-images",
    route: V1.auctionSideImagesRoute,
  },
  {
    url: "/api/v1/oc-address",
    route: V1.ocAddressRoute,
  },
  {
    url: "/api/v1/auction-question",
    route: V1.auctionQuestionRoute,
  },
  {
    url: "/api/v1/oc-customer-wallet",
    route: V1.ocCustomerWalletRoute,
  },
  {
    url: "/api/v1/auction-question-reply",
    route: V1.auctionQuestionReplyRoute,
  },
  {
    url: "/api/v1/auction-bid",
    route: V1.auctionBidRoute,
  },
  {
    url: "/api/v1/lounge-post",
    route: V1.loungePostRoute,
  },
  {
    url: "/api/v1/lounge-group",
    route: V1.loungeGroupRoute,
  },
  {
    url: "/api/v1/lounge-group-member",
    route: V1.loungeGroupMemberRoute,
  },
  {
    url: "/api/v1/lounge-post-comments",
    route: V1.loungePostCommentsRoute,
  },
  {
    url: "/api/v1/auction-view",
    route: V1.auctionViewRoute,
  },
  {
    url: "/api/v1/auction-cart",
    route: V1.auctionCartRoute,
  },
  {
    url: "/api/v1/auction-video-call",
    route: V1.auctionVideoCallRoute,
  },
  {
    url: "/api/v1/oc-category-description",
    route: V1.ocCategoryDescriptionRoute,
  },
  {
    url: "/api/v1/upload",
    route: V1.uploadRoute,
  },
  {
    url: "/api/v1/lounge-social",
    route: V1.loungeSocialRoute,
  },
  {
    url: "/api/v1/oc-message-inbox",
    route: V1.ocMessageInboxRoute,
  },
  {
    url: "/api/v1/oc-message-inbox-ca",
    route: V1.ocDeliveryChargeCaRoute,
  },
  {
    url: "/api/v1/auctioner-message",
    route: V1.auctionerMessageRoute,
  },
  {
    url: "/api/v1/conversation",
    route: V1.conversationRoute,
  },
  {
    url: "/api/v1/youtube",
    route: V1.youtubeRoute,
  },
  {
    url: "/api/v1/seller-branch-selected-products",
    route: V1.sellerBranchSelectedProductsRoute,
  },
  {
    url: "/api/v1/latest-promo",
    route: V1.latestPromoRoute,
  },
  {
    url: "/api/v1/lp-seller-promo-list",
    route: V1.lpSellerPromoListRoute,
  },
  {
    url: "/api/v1/oc-seller",
    route: V1.ocSellerRoute,
  },
  {
    url: "/api/v1/oc-banner-image-description",
    route: V1.ocBannerImageDescriptionRoute,
  },
  {
    url: "/api/v1/oc-banner-image",
    route: V1.ocBannerImageRoute,
  },
  {
    url: "/api/v1/product-views",
    route: V1.productViewsRoute,
  },
  {
    url: "/api/v1/oc-product",
    route: V1.ocProductRoute,
  },
  {
    url: "/api/v1/oc-product-image",
    route: V1.ocProductImageRoute,
  },
  {
    url: "/api/v1/oc-product-description",
    route: V1.ocProductDescriptionRoute,
  },
  {
    url: "/api/v1/oc-manufacturer",
    route: V1.ocManufacturerRoute,
  },
  {
    url: "/api/v1/oc-review",
    route: V1.ocReviewRoute,
  },
  {
    url: "/api/v1/oc-customer-wishlist",
    route: V1.ocCustomerWishlistRoute,
  },
  {
    url: "/api/v1/seller-branch",
    route: V1.sellerBranchRoute,
  },
  {
    url: "/api/v1/oc-cart",
    route: V1.ocCartRoute,
  },
  {
    url: "/api/v1/bg-product",
    route: V1.bgProductRoute,
  },
  {
    url: "/api/v1/address-tracker",
    route: V1.addressTrackerRoute,
  },
  {
    url: "/api/v1/auction-order",
    route: V1.auctionOrderRoute,
  },
  {
    url: "/api/v1/lounge-comment-social",
    route: V1.loungeCommentSocialRoute,
  },
];
export const addRoutes: AddRoutes = (app: Express) => {
  routes.forEach((route) => {
    app.use(route.url, route.route);
  });
};
