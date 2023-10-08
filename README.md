# peso-app-api

### Address Tracker Route

```
ROUTE: `/address-tracker`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"province": "Abra"
		},
		{
			"province": "Agusan Del Norte"
		},
		{
			"province": "Agusan Del Sur"
		},
	],
	"status": "success",
	"message": "Get Address Tracker success",
	"meta": {
		"currentPage": 1,
		"limit": 10
	}
}
```

### Auction Route

```
ROUTE: `/auction`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"id": 162,
			"name": "Apple TV 4K | 64GB",
			"price": 10990,
			"main_image": "img/auction/c877dce173b5a7dd2cc92635c15d3ec1.jpg",
			"sold": false,
			"buy_price": 11990,
			"condition_id": 1,
			"model": "64GB",
			"due_date": "2023-12-10T00:00:00.000Z",
			"brand_id": 30,
			"category_id": 105,
			"description": "This is a product test for trading market",
			"views": 0,
			"created_At": "2023-09-01T08:04:43.000Z",
			"updated_At": "2023-09-01T08:04:43.000Z",
			"customer_id": 729859,
			"reason_of_selling": "I want to upgrade to latest",
			"issue": "",
			"warranty": "1 Month",
			"freebies": "",
			"owner_history": "First Owner",
			"inclusions": "Box,Product Instruction/Manual",
			"tags": "Others,apple,apple tv",
			"deleted_at": null,
			"auction_day": null,
			"days_to_auction": 100,
			"date_posted": "2023-09-01T00:44:17.000Z",
			"delivery_charge_id": 1,
			"quantity": 1,
			"condition": {
				"id": 1,
				"condition": "New"
			}
		}
	],
	"status": "success",
	"message": "Get Auction success",
	"meta": {
		"currentPage": 1,
		"limit": 1000
	}
}
```

### Auction Bid Route

```
ROUTE: `/auction-bid`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"id": 1,
			"bid": "26000",
			"customer_id": 3729,
			"auction_id": 64,
			"created_at": "2023-05-03T13:23:53.000Z",
			"is_approved": true,
			"approval_due": "2023-05-06T00:00:00.000Z"
		}
	],
	"status": "success",
	"message": "Get Auction Bid success"
}
```

### Auction Cart Route

```
ROUTE: `/auction-cart`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"id": 1,
			"customer_id": 3729,
			"auction_id": 64,
			"auctioner_id": 3729,
			"price": 26000,
			"date_added": "2023-05-05T15:31:54.000Z",
			"quantity": 1,
			"due": "2023-05-06T00:00:00.000Z"
		}
	],
	"status": "success",
	"message": "Get Auction Cart success",
	"meta": {
		"currentPage": 1,
		"limit": 10
	}
}
```

### Auctioner Message Route

```
ROUTE: `/auctioner-message`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"id": 1,
			"sender_id": 3729,
			"receiver_id": 3729,
			"date_added": "2023-05-03T13:24:06.000Z",
			"message": "test chat",
			"chat_no": 1,
			"sms_type": "WITH_ITEM",
			"auction_id": 64,
			"call_status": 0,
			"call_duration": "00:00:00",
			"call_id": 0,
			"read": "2023-05-04T18:36:19.000Z"
		}
		],
	"status": "success",
	"message": "Get Auctioner Message success"
}
```

### Auction Order Route

```
ROUTE: `/auction-order`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"id": 133,
			"invoice_no": 0,
			"invoice_prefix": "PCV-2019-00000",
			"store_id": 0,
			"store_name": " PESOapp Gadget Mall",
			"store_url": "https://pesoapp.ph/",
			"customer_id": 1601,
			"customer_group_id": 0,
			"firstname": "PESO",
			"lastname": "Store",
			"email": "macuartero@pinoyelectronicstore.com",
			"telephone": "9949312857",
			"fax": "",
			"custom_field": "https://pesoapp.ph/",
			"payment_firstname": "PESO",
			"payment_lastname": "Store",
			"payment_company": "Mobile Android Web test",
			"payment_address_1": "123",
			"payment_address_2": "1",
			"payment_city": "Caloocan City",
			"payment_postcode": "1400",
			"payment_country": "Philippines",
			"payment_country_id": 168,
			"payment_zone": "0",
			"payment_zone_id": 0,
			"payment_address_format": "",
			"payment_custom_field": "[]",
			"payment_method": "Cash on Delivery",
			"payment_code": "cod",
			"shipping_firstname": "PESO",
			"shipping_lastname": "Store",
			"shipping_company": "Mobile Android Web test",
			"shipping_address_1": "123",
			"shipping_address_2": "1",
			"shipping_city": "Caloocan City",
			"shipping_postcode": "1400",
			"shipping_country": "Philippines",
			"shipping_country_id": 168,
			"shipping_zone": "0",
			"shipping_zone_id": 0,
			"shipping_address_format": "",
			"shipping_custom_field": "[]",
			"shipping_method": "Standard Shipping Rate",
			"shipping_code": "flat_rate",
			"comment": "",
			"total": "22",
			"order_status_id": 0,
			"affiliate_id": 0,
			"commission": "0",
			"marketing_id": 0,
			"tracking": "",
			"language_id": 1,
			"currency_id": 4,
			"currency_code": "PHP",
			"currency_value": "1",
			"ip": "66.248.202.32",
			"forwarded_ip": "",
			"user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
			"accept_language": "en-US,en;q=0.9",
			"date_added": "2023-08-22T22:06:17.000Z",
			"date_modified": "2023-08-22T22:06:17.000Z",
			"wr": null,
			"payment_district": "Barangay 163",
			"payment_region": "Metro Manila",
			"shipping_district": "Barangay 163",
			"shipping_region": "Metro Manila",
			"skip_shipping_insurance": 1,
			"ops_verification": null,
			"fund_status": null
		}
		],
	"status": "success",
	"message": "Get Auction Order success",
	"meta": {
		"currentPage": 1,
		"limit": 10
	}
}
```

### Auction Question Route

```
ROUTE: `/auction-question`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"id": 1,
			"auction_id": 65,
			"customer_id": 1601,
			"question": "whats the buy now price???",
			"date_added": "2023-05-03T19:39:40.000Z"
		}
		],
	"status": "success",
	"message": "Get Auction Question success"
}
```

### Auction Question Reply Route

```
ROUTE: `/auction-question-reply`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"id": 1,
			"customer_id": 401192,
			"question_id": 6,
			"reply": "TEST REPLY",
			"date_added": "2023-06-20T11:09:12.000Z"
		}
		],
	"status": "success",
	"message": "Get Auction Question Reply success"
}
```

### Auction Side Images Route

```
ROUTE: `/auction-side-images`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"id": 69,
			"auction_id": 65,
			"image_path": "img/auction/59c762407854f682852bd6b1ede5286d.jpg",
			"sort_order": 1
		}
		],
	"status": "success",
	"message": "Get Auction Side Images success"
}
```

### Auction Video Call Route

```
ROUTE: `/auction-video-call`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"id": 1,
			"link": "PesoApp-8MhMVWoQtgItYz2",
			"auctioner_id": 3729,
			"auction_id": 64,
			"customer_id": 1601,
			"status": 1,
			"date_added": "2023-05-04T18:35:09.000Z"
		}
		],
	"status": "success",
	"message": "Get Auction Video Call success",
	"meta": {
		"currentPage": 1,
		"limit": 10
	}
}
```

### Condition Route

```
ROUTE: `/condition`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"id": 1,
			"condition": "New"
		},
		{
			"id": 2,
			"condition": "Used - Like New"
		}
		],
	"status": "success",
	"message": "Get Condition success"
}
```

### Latest Promo Route

```
ROUTE: `/latest-promo`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"id": 461,
			"title": " Smart Phone",
			"image": "/latest_promo/Promos 0001 (2).png",
			"sort": 4,
			"status": 1,
			"seller_list_id": null,
			"thumbnail_image": "",
			"featured_promo": 0,
			"promo_title_image": "",
			"exclusive_for": 0,
			"date_from": "2023-10-01T00:00:00.000Z",
			"date_to": "2023-10-31T00:00:00.000Z"
		}
		],
	"status": "success",
	"message": "Get Latest Promo success",
	"meta": {
		"currentPage": 1,
		"limit": 10
	}
}
```

### Lounge Group Route

```
ROUTE: `/lounge-group`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"id": 3,
			"name": "Apple Users",
			"customer_id": 3729,
			"date_added": "2023-05-03T13:43:34.000Z",
			"date_deleted": null,
			"picture": "img/group/e7757561c0099df9ec50b19361250c6a.jpg",
			"members": [
				{
					"id": 3,
					"lounge_group_id": 3,
					"customer_id": 3729,
					"date_added": "2023-05-03T13:43:34.000Z"
				},
				{
					"id": 5,
					"lounge_group_id": 3,
					"customer_id": 9177,
					"date_added": "2023-05-03T20:40:11.000Z"
				},
				{
					"id": 12,
					"lounge_group_id": 3,
					"customer_id": 590530,
					"date_added": "2023-06-11T23:19:37.000Z"
				},
				{
					"id": 15,
					"lounge_group_id": 3,
					"customer_id": 401192,
					"date_added": "2023-06-27T17:41:12.000Z"
				}
			]
		}
		],
	"status": "success",
	"message": "Get Lounge Group success",
	"meta": {
		"currentPage": 1,
		"limit": 10
	}
}
```

### Lounge Group Member Route

```
ROUTE: `/lounge-group-member`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"id": 1,
			"lounge_group_id": 1,
			"customer_id": 3729,
			"date_added": "2023-05-03T13:32:35.000Z"
		}
		],
	"status": "success",
	"message": "Get Lounge Group Member success",
	"meta": {
		"currentPage": 1,
		"limit": 10
	}
}
```

### Lounge Post Comments Route

```
ROUTE: `/lounge-post-comments`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"comment_id": 2,
			"customer_id": 384388,
			"post_id": 57,
			"comment": "\"Hello i like this phone\"",
			"date_created": "2023-01-04T23:45:35.000Z",
			"date_modified": "2023-01-04T23:45:35.000Z",
			"comment_parent_id": 0
		}
		],
	"status": "success",
	"message": "Get Lounge Post Comments success",
	"meta": {
		"currentPage": 1,
		"limit": 10
	}
}
```

### Lounge Social Route

```
ROUTE: `/lounge-social`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"post_id": 26,
			"customer_id": 9177,
			"like": 1,
			"date_added": "2023-08-10T12:56:35.000Z"
		}
		],
	"status": "success",
	"message": "Get Lounge Social success",
	"meta": {
		"currentPage": 1,
		"limit": 10
	}
}
```

### LP Seller Promo List Route

```
ROUTE: `/lp-seller-promo-list`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"id": 2,
			"latest_promo_id": 270,
			"deduction_id": 4,
			"seller_list_id": 384
		}
		],
	"status": "success",
	"message": "Get Lp Seller Promo List success",
	"meta": {
		"currentPage": 1,
		"limit": 10
	}
}
```

### Oc Address Route

```
ROUTE: `/oc-address`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"address_id": 343,
			"customer_id": 122,
			"firstname": "Marc Kevin",
			"lastname": "Flores",
			"company": "test",
			"address_1": "test",
			"address_2": "test",
			"city": "Bangued",
			"postcode": "2800",
			"country_id": 168,
			"zone_id": 0,
			"custom_field": "",
			"seller_id": null,
			"district": "Maoay",
			"tracking_id": 1770,
			"region": "Abra"
		}
		],
	"status": "success",
	"message": "Get Oc Address success"
}
```

### Oc Banner Image Route

```
ROUTE: `/oc-banner-image`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"banner_image_id": 15549,
			"banner_id": 14,
			"link": "https://pesoapp.ph/product_category_new.php?promo_id=66&t=64c1cf6004b9f",
			"image": "catalog_new/banner/Mob Main Banners 02.png",
			"sort_order": 0
		}
		],
	"status": "success",
	"message": "Get Oc Banner Image success",
	"meta": {
		"currentPage": 1,
		"limit": 10
	}
}
```

### Oc Banner Image Description Route

```
ROUTE: `/oc-banner-image-description`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"banner_image_id": 15548,
			"language_id": 1,
			"banner_id": 14,
			"title": "Iphone 15"
		}
		],
	"status": "success",
	"message": "Get Oc Banner Image Description success",
	"meta": {
		"currentPage": 1,
		"limit": 10
	}
}
```

### Oc Cart Route

```
ROUTE: `/oc-cart`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"cart_id": 8,
			"customer_id": 4027,
			"session_id": "",
			"product_id": 7140,
			"recurring_id": 0,
			"option": "",
			"quantity": 1,
			"date_added": "2021-06-30T13:58:11.000Z",
			"p_type": 0,
			"warehouse_code": null,
			"seller_id": 21,
			"price": "18999",
			"discount_details": "0.00",
			"freebies": "",
			"deduction_id": 0,
			"branch_id": null
		}
		],
	"status": "success",
	"message": "Get Oc Cart success",
	"meta": {
		"currentPage": 1,
		"limit": 10
	}
}
```

### Oc Category Description Route

```
ROUTE: `/oc-category-description`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"category_id": 1,
			"language_id": 1,
			"name": "Computer",
			"description": "Computer",
			"meta_title": "Computer",
			"meta_description": "Computer",
			"meta_keyword": "",
			"peso_keywords": "Computer,laptop,pc,gaming laptop,desktop"
		}
		],
	"status": "success",
	"message": "Get Oc Category Description success"
}
```

### Oc Customer Wallet Route

```
ROUTE: `/oc-customer-wallet`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"id": 3,
			"customer_id": 1,
			"particulars": "Reward for the first 100 seeders",
			"amount": "20",
			"date_added": "2019-03-08T01:56:49.000Z",
			"status": null
		}
		],
	"status": "success",
	"message": "Get Oc Customer Wallet success"
}
```

### Oc Customer Wishlist Route

```
ROUTE: `/oc-customer-wishlist?page=10`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"customer_id": -1,
			"product_id": 0,
			"date_added": "2021-07-04T22:49:25.000Z",
			"p_type": 0
		}
		],
	"status": "success",
	"message": "Get Oc Customer Wishlist success",
	"meta": {
		"currentPage": 10,
		"limit": 10
	}
}
```

### Oc Delivery Charge Route

```
ROUTE: `/oc-delivery-charge`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"id": 1,
			"name": "Medium (12X18 up to 5kls.)",
			"amount": "100",
			"max_quantity": 1,
			"convert_quantity": 1,
			"convert_id": 1,
			"provincial_amount": "210"
		}
		],
	"status": "success",
	"message": "Get Oc Delivery Charge success"
}
```

### Oc Manufacturer Route

```
ROUTE: `/oc-manufacturer`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"manufacturer_id": 11,
			"name": "DELL",
			"image": "catalog/demo/manufacturer/dell.png",
			"sort_order": 1
		}
	],
	"status": "success",
	"message": "Get Oc Manufacturer success",
	"meta": {
		"currentPage": 1,
		"limit": 10
	}
}
```

### Oc Message Inbox Route

```
ROUTE: `/oc-message-inbox`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"id": 1,
			"sender": "19",
			"receiver": "102",
			"message": "test",
			"status": 0,
			"timestamp": "2021-06-25T22:08:07.000Z",
			"void": null,
			"read": "2021-06-28T13:49:37.000Z",
			"seller_id": "19",
			"customer_id": "102",
			"product_id": 0,
			"branch_id": 0
		}
		],
	"status": "success",
	"message": "Get Oc Message Inbox success"
}
```

### Oc Product Route

```
ROUTE: `/oc-product`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"product_id": 51,
			"model": "GIGVCD-2002",
			"sku": "",
			"upc": "",
			"ean": "",
			"jan": "",
			"isbn": "",
			"mpn": "",
			"location": "",
			"quantity": 0,
			"stock_status_id": 5,
			"image": "catalog/INNO3D GT730.png",
			"manufacturer_id": 0,
			"shipping": true,
			"price": "3100",
			"points": 0,
			"tax_class_id": 0,
			"date_available": "2019-03-26",
			"weight": "0",
			"weight_class_id": 1,
			"length": "0",
			"width": "0",
			"height": "0",
			"length_class_id": 1,
			"subtract": true,
			"minimum": 0,
			"sort_order": 1,
			"status": false,
			"viewed": 0,
			"date_added": "2019-03-26T06:02:59.000Z",
			"date_modified": "2019-05-02 01:40:41",
			"seller_id": null,
			"user_id": null,
			"new_design": 0,
			"watermark": 1
		}
		],
	"status": "success",
	"message": "Get Oc Product success",
	"meta": {
		"currentPage": 1,
		"limit": 10
	}
}
```

### Oc Product Brand Route

```
ROUTE: `/oc-product-brand`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"id": 31,
			"name": "Aptus",
			"description": "Aptus",
			"image": "/lc_brand/viber_image_2021-02-19_14-14-13.png",
			"status": 0,
			"banner_img": null,
			"banner_moblie_img": null,
			"sort_order": 1
		}
		],
	"status": "success",
	"message": "Get Oc Product Brand success"
}
```

### Oc Production Description Route

```
ROUTE: `/oc-product-description`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"product_id": 0,
			"language_id": 1,
			"name": "",
			"description": "",
			"tag": "",
			"meta_title": "",
			"meta_description": "",
			"meta_keyword": ""
		}
		],
	"status": "success",
	"message": "Get Oc Product Description success",
	"meta": {
		"currentPage": 1,
		"limit": 10
	}
}
```

### Oc Product Image Route

```
ROUTE: `/oc-product-image`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"product_image_id": 86607,
			"product_id": 12165,
			"image": "newproduct/f50051967570928457b6a71b43b4d83d.png",
			"sort_order": 2
		}
		],
	"status": "success",
	"message": "Get Oc Product Image success",
	"meta": {
		"currentPage": 1,
		"limit": 10
	}
}
```

### Oc Review Route

```
ROUTE: `/oc-review`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"review_id": 3,
			"product_id": 1766,
			"customer_id": 105,
			"branch_id": 0,
			"author": "mac",
			"text": "this is a great unit.... love it",
			"rating": 5,
			"status": true,
			"date_added": "2019-08-19T06:53:28.000Z",
			"date_modified": "2019-08-19T06:53:28.000Z"
		}
		],
	"status": "success",
	"message": "Get Oc Review success",
	"meta": {
		"currentPage": 1,
		"limit": 10
	}
}
```

### Oc Seller Route

```
ROUTE: `/oc-seller`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"seller_id": 22,
			"username": "online@wiltelcom.com",
			"password": "c3d693411df122ae90a6da898081d3d5",
			"firstname": null,
			"lastname": null,
			"email": "online@wiltelcom.com",
			"image": "powered.jpg",
			"date_added": "2021-06-03T20:36:52.000Z",
			"status": 0,
			"shop_name": "Wiltelcom",
			"mobile": "+639338529321",
			"brand_color": null,
			"banner_image": null,
			"selected": 0,
			"seller_type": 0
		}
		],
	"status": "success",
	"message": "Get Oc Seller success",
	"meta": {
		"currentPage": 1,
		"limit": 10
	}
}
```

### Product Views Route

```
ROUTE: `/product-views`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [],
	"status": "success",
	"message": "Get Product Views success",
	"meta": {
		"limit": 10,
		"page": 1,
		"customer_id": 1601,
		"product_id": 0,
		"p_type": 0
	}
}
```

### Seller Branch Route

```
ROUTE: `/seller-branch`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"id": 2,
			"b_name": "SM Megamall Cyber Zone",
			"seller_id": 16,
			"address_1": "cyber zone area",
			"Address_2": "SM Megamall",
			"city": "Mandaluyong City",
			"postcode": "1600",
			"country_id": "168",
			"zone_id": "4232",
			"bank_account_no": null,
			"bank_name": null,
			"district": null,
			"tracking_id": null,
			"region": null,
			"bank_account_name": null,
			"telephone": null,
			"username": null,
			"password": null,
			"branch_logo": null,
			"email": null,
			"live_demo_status": 0
		}
		],
	"status": "success",
	"message": "Get Seller Branch success",
	"meta": {
		"currentPage": 1,
		"limit": 10
	}
}
```

### Seller Branch Selected Products Route

```
ROUTE: `/seller-branch-selected-products`
METHOD: GET
```

## REQUEST
```
{}
```

## RESPONSE
``` json
{
	"data": [
		{
			"product_id": 9049,
			"name": "XTREME 55-inch Android 10.0 4K Ultra HD Frameless LED TV MF-5500SA",
			"href": "product/xtreme-55-inch-android-10.0-4k-ultra-hd-frameless-led-tv-mf-5500sa/9049",
			"image": "newproduct/b59df1d16e2606484e2444bff8cc149d.png",
			"price": "30995",
			"watermark": 0,
			"seller_id": 19,
			"seller_image": "company/Copy of Unnamed Design (3).png"
		}
		],
	"status": "success",
	"message": "Get Seller Branch Selected Products success",
	"meta": {
		"currentPage": 1,
		"limit": 10
	}
}
```

























































