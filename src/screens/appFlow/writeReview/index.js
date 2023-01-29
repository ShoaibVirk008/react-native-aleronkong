import React, { useState } from 'react'
import { height, width } from 'react-native-dimension'
import { Wrapper, Text, Common, Images, Spacer, Icons, TextInputs, Ratings, Buttons, Toasts } from '../../../components'
import { goBack } from '../../../navigation/rootNavigation'
import { Api, appImages, appStyles, HelpingMethods, sizes } from '../../../services'

export default function Index({ route }) {
    const orderData = route?.params?.orderData || null
    const productData = route?.params?.productData || null
    const handleRefresh = route?.params?.handleRefresh || null
    const order_id = orderData?._id || ''
    const prodcut_id = orderData?.product?._id || productData?._id || ''
    const [loadingReview, setLoadinReview] = useState(false)
    const [comment, setComment] = useState('')
    const [commentError, setCommentError] = useState('')
    const [rating, setRating] = useState(5)

    const handleValidation = () => {
        HelpingMethods.handleAnimation()
        !comment ? setCommentError('Please write comment') : setCommentError('')
        if (comment) {
            return true
        } else {
            return false
        }
    }
    const handleSubmitReview = async () => {
        if (handleValidation()) {
            setLoadinReview(true)
            await Api.addProductReview({
                order: order_id,
                product: prodcut_id,
                rating,
                review: comment
            })
                .then(res => {
                    if (res) {
                        handleRefresh && handleRefresh()
                        goBack()
                        Toasts.Success('Review has been submitted')
                    }
                })
            setLoadinReview(false)
        }
    }
    return (
        <Common.PopupWrappers.Primary
            //onPressButton1={() => { navigate(routes.userDetail) }}
            // onPressButton1={() => { }}
            // buttonText1='Submit'
            //hideHeader
            toggle={goBack}
            //disableBackdropPress
            // icon={
            //     <Images.Profile
            //         source={{ uri: appImages.user2 }}
            //         size={width(25)}
            //         shadow
            //     />
            // }
            loadingButton1={loadingReview}
            // headerTitle={'Write a Review'}
            // onPressClose={goBack}
            headerComponent={
                <Wrapper marginHorizontalBase alignItemsCenter paddingVerticalBase justifyContentCenter>
                    <Text isSmallTitle alignTextCenter isBoldFont>Write a Review </Text>
                    <Wrapper isAbsolute style={{ left: 0 }}>
                        <Icons.Back
                            onPress={goBack}
                        />
                    </Wrapper>
                </Wrapper>
            }
        // title={
        //     <Text isSmallTitle>{`Support Stacey Graham`}
        //         {'\n'}
        //         <Text isTinyTitle style={{ marginTop: sizes.marginVertical }}>{`for $15 per month`}</Text>
        //     </Text>
        // }
        //  info={'asdadasasd'}
        >
            <Wrapper>
                <Spacer isSmall />
                <Wrapper marginHorizontalBase>

                    <Wrapper alignItemsCenter>
                        <Ratings.Primary
                            value={rating}
                            onPressIcon={v => setRating(v)}
                            iconSize={width(12.5)}
                        />
                    </Wrapper>

                </Wrapper>
                <Spacer isBasic />
                <TextInputs.Colored
                    title={'Comment'}
                    placeholder={'Write comment here...'}
                    value={comment}
                    onChangeText={t => {
                        setComment(t)
                        commentError && [HelpingMethods.handleAnimation(), setCommentError('')]
                    }}
                    multiline
                    inputStyle={[{ height: height(20), textAlignVertical: 'top', }, appStyles.marginVerticalSmall]}
                    error={commentError}
                />
                <Spacer isDoubleBase />
                <Buttons.Colored
                    text={'Submit'}
                    onPress={handleSubmitReview}
                    isLoading={loadingReview}
                />
                <Spacer isBasic />
            </Wrapper>
        </Common.PopupWrappers.Primary>
    )
}