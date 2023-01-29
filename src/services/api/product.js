import axios from "axios";
import { Toasts } from "../../components";
import { baseURL, endPoints } from "../constants";
import store, { actions } from "../store";
import { setCurrentUser } from "../store/actions";

export const AddProduct = async ({
    title, description, media, type,
    price, category, status,
    //physical product info
    availableColors, availableSizes, quantity,
    //digital product info
    productFile, productSampleFile, asin,
    publicationDate, language, fileSize,
    simultaneousDeviceUsage, textToSpeech,
    enhancedTypeSetting, xRay,
    wordWise, printLength, lending,
    //sync with amazon
    syncWithAmazon,

}) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {
        title,
        description,
        media,
        type,
        price,
        category,
        //quantity,
        syncWithAmazon,
        status,
        //file:productFile,
    }
    //extra params for physical products
    availableColors ? params['availableColors'] = availableColors : null
    availableSizes ? params['availableSizes'] = availableSizes : null
    quantity ? params['quantity'] = quantity : null

    //extra params for digital products
    productFile ? params['file'] = productFile : null
    productSampleFile ? params['audioSample'] = productSampleFile : null
    asin ? params['asin'] = asin : null
    publicationDate ? params['publicationDate'] = publicationDate : null
    language ? params['language'] = language : null
    fileSize ? params['fileSize'] = fileSize : null
    simultaneousDeviceUsage ? params['simultaneousDeviceUsage'] = simultaneousDeviceUsage : null
    textToSpeech ? params['textToSpeech'] = textToSpeech : null
    enhancedTypeSetting ? params['enhancedTypeSetting'] = enhancedTypeSetting : null
    xRay ? params['xRay'] = xRay : null
    wordWise ? params['wordWise'] = wordWise : null
    printLength ? params['printLength'] = printLength : null
    lending ? params['lending'] = lending : null

    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.addProduct}`
    console.log('AddProduct \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .post(uri, params, config)
        .then(async responseJson => {
            console.log('AddProduct Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(Error => {
            Toasts.Error(Error.response.data.message)
            console.error(Error);
        });
    return response
};
export const updateProduct = async ({
    productId,
    title, description, media, type,
    price, category, status,
    //physical product info
    availableColors, availableSizes, quantity,
    //digital product info
    productFile, productSampleFile, asin,
    publicationDate, language, fileSize,
    simultaneousDeviceUsage, textToSpeech,
    enhancedTypeSetting, xRay,
    wordWise, printLength, lending,
    //sync with amazon
    syncWithAmazon,

}) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {
        title,
        description,
        media,
        type,
        price,
        category,
        //quantity,
        syncWithAmazon,
        status,
        //file:productFile,
    }
    //extra params for physical products
    availableColors ? params['availableColors'] = availableColors : null
    availableSizes ? params['availableSizes'] = availableSizes : null
    quantity ? params['quantity'] = quantity : null

    //extra params for digital products
    productFile ? params['file'] = productFile : null
    productSampleFile ? params['audioSample'] = productSampleFile : null
    asin ? params['asin'] = asin : null
    publicationDate ? params['publicationDate'] = publicationDate : null
    language ? params['language'] = language : null
    fileSize ? params['fileSize'] = fileSize : null
    simultaneousDeviceUsage ? params['simultaneousDeviceUsage'] = simultaneousDeviceUsage : null
    textToSpeech ? params['textToSpeech'] = textToSpeech : null
    enhancedTypeSetting ? params['enhancedTypeSetting'] = enhancedTypeSetting : null
    xRay ? params['xRay'] = xRay : null
    wordWise ? params['wordWise'] = wordWise : null
    printLength ? params['printLength'] = printLength : null
    lending ? params['lending'] = lending : null

    const config = { headers: { "Authorization": `Bearer ${token}` } }
    const uri = `${baseURL + endPoints.product.product}/${productId}/${endPoints.product.update}`
    console.log('updateProduct \n\n  uri', uri, '\n\n  params', params, '\n\n config', config)
    await axios
        .put(uri, params, config)
        .then(async responseJson => {
            console.log('updateProduct Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(Error => {
            Toasts.Error(Error.response.data.message)
            console.error(Error);
        });
    return response
};

export const getProductCategories = async (type) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {}
    const uri = `${baseURL + endPoints.getProductCategory}${type ? '?type=' + type : ''}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('getProductCategories \n\n uri===>', uri, '\n\n params', params)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('getProductCategories Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(error => {
            Toasts.Error(error.response.data.message)
            console.error(error);
        });
    return response
};

export const getCartDetail = async () => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {}
    const uri = `${baseURL + endPoints.product.product}/${endPoints.product.cart}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('getCartDetail \n\n uri===>', uri, '\n\n params', params)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('getCartDetail Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(error => {
            Toasts.Error(error.response.data.message)
            console.error(error);
        });
    return response
};

export const addToCart = async ({ productId, selectedColor, selectedSize }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = {
        // selectedColor,
        // selectedSize
    }
    selectedColor && [params['selectedColor'] = selectedColor]
    selectedSize && [params['selectedSize'] = selectedSize]
    const uri = `${baseURL + endPoints.product.product}/${productId}/${endPoints.product.addToCart}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('addToCart \n\n uri===>', uri, '\n\n params', params)
    await axios
        .post(uri, params, config)
        .then(async responseJson => {
            console.log('addToCart Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(error => {
            Toasts.Error(error.response.data.message)
            console.error(error);
        });
    return response
};

export const removeFromCart = async ({ productId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {}
    const uri = `${baseURL + endPoints.product.product}/${productId}/${endPoints.product.removeFromCart}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('removeFromCart \n\n uri===>', uri, '\n\n params', params)
    await axios
        .put(uri, params, config)
        .then(async responseJson => {
            console.log('removeFromCart Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(error => {
            Toasts.Error(error.response.data.message)
            console.error(error);
        });
    return response
};

export const increaseDecreaseCartItemQuantity = async ({ productId, increase, decrease }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {}
    const uri = `${baseURL + endPoints.product.product}/${productId}/${endPoints.product.cart}/${endPoints.product.incDec}?${increase ? 'inc=true' : decrease ? 'dec=true' : ''}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('increaseDecreaseCartItemQuantity \n\n uri===>', uri, '\n\n params', params)
    await axios
        .put(uri, params, config)
        .then(async responseJson => {
            console.log('increaseDecreaseCartItemQuantity Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(error => {
            Toasts.Error(error.response.data.message)
            console.error(error);
        });
    return response
};

export const getStoreProducts = async ({ userId, userStore, showBoughtProducts, category }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const user_id = userId ? userId : storeState.user.currentUser._id
    const params = {}
    const uri = `${baseURL + endPoints.product.product}/${endPoints.product.store}?${userStore ? `creator=${user_id}` : ''}${showBoughtProducts ? `showBoughtProducts=true` : ''}${category ? `category=` + category : ''}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('getStoreProducts \n\n uri===>', uri, '\n\n params', params)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('getStoreProducts Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(error => {
            Toasts.Error(error.response.data.message)
            console.error(error);
        });
    return response
};
export const checkout = async ({ paymentMethod, address }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = { paymentMethod, address }
    const uri = `${baseURL + endPoints.product.product}/${endPoints.product.checkout}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('checkout \n\n uri===>', uri, '\n\n params', params)
    await axios
        .post(uri, params, config)
        .then(async responseJson => {
            console.log('checkout Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(error => {
            Toasts.Error(error.response.data.message)
            console.error(error);
        });
    return response
};

export const buyProduct = async ({ product, paymentMethod }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = { product, paymentMethod }
    const uri = `${baseURL + endPoints.product.product}/${endPoints.product.buy}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('buyProduct \n\n uri===>', uri, '\n\n params', params)
    await axios
        .post(uri, params, config)
        .then(async responseJson => {
            console.log('buyProduct Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(error => {
            Toasts.Error(error.response.data.message)
            console.error(error);
        });
    return response
};

export const getAllShowcaseProducts = async () => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {}
    const uri = `${baseURL + endPoints.product.product}/${endPoints.product.getAllShowcase}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('getAllShowcaseProducts \n\n uri===>', uri, '\n\n params', params)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('getAllShowcaseProducts Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(error => {
            Toasts.Error(error.response.data.message)
            console.error(error);
        });
    return response
};

export const addProductReview = async ({ product, order, rating, review }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    let params = { product, rating, review }
    order && [params['order'] = order]
    const uri = `${baseURL + endPoints.product.product}/${endPoints.product.writeReview}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('addProductReview \n\n uri===>', uri, '\n\n params', params)
    await axios
        .post(uri, params, config)
        .then(async responseJson => {
            console.log('addProductReview Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(error => {
            Toasts.Error(error.response.data.message)
            console.error(error);
        });
    return response
};
export const getProductReviews = async ({ productId }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {}
    const uri = `${baseURL + endPoints.product.product}/${productId}/${endPoints.product.getReviews}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('getProductReviews \n\n uri===>', uri, '\n\n params', params)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('getProductReviews Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(error => {
            Toasts.Error(error.response.data.message)
            console.error(error);
        });
    return response
};

export const getTrendingProducts = async ({ category }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {}
    const uri = `${baseURL + endPoints.product.product}/${endPoints.product.getTrending}?${category ? 'category=' + category : ''}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('getTrendingProducts \n\n uri===>', uri, '\n\n params', params)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('getTrendingProducts Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(error => {
            Toasts.Error(error.response.data.message)
            console.error(error);
        });
    return response
};

export const getAlLProducts = async ({ page, category }) => {
    let response = null
    const storeState = store.getState()
    const token = storeState.user.userToken
    const params = {}
    const uri = `${baseURL + endPoints.product.product}/${endPoints.product.findAll}?${page ? 'page=' + page : ''}${page && category ? '&' : ''}${category ? 'category=' + category : ''}`
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    console.log('getAlLProducts \n\n uri===>', uri, '\n\n params', params)
    await axios
        .get(uri, config)
        .then(async responseJson => {
            console.log('getAlLProducts Response', responseJson.data);
            if (responseJson.data) {
                if (responseJson.data.statusCode === 200) {
                    response = responseJson.data
                } else {
                    Toasts.Error(responseJson.data.message)
                }
            }
        })
        .catch(error => {
            Toasts.Error(error.response.data.message)
            console.error(error);
        });
    return response
};