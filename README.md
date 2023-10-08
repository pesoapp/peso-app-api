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
```
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