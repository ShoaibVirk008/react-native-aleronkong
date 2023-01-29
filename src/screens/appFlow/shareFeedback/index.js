import React, { Component, useState } from 'react';
import { View, } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { SearchBar } from 'react-native-elements';
import { Wrapper, Headers, Cards, Spacer, Ratings, Text, ScrollViews, Lines, TextInputs, Buttons } from '../../../components';
import { appStyles, DummyData, sizes } from '../../../services';

export default function Index() {

  const productDetail = DummyData.e_books[1]
  const { type, category, image, title, available_colors,
    available_sizes, price, rating, reviews_count } = productDetail

  const [productRating, setProductRating] = useState(4)
  return (
    <Wrapper isMain>
      <Headers.Primary
        title={'Share Your Feedback'}
        showBackArrow
      />
      <ScrollViews.WithKeyboardAvoidingView>
        <Spacer isBasic />
        <Cards.UserPrimary
          imageUri={image}
          imageSize={width(30)}
          imageStyle={{ borderRadius: 0 }}
          title={title}
          containerStyle={[appStyles.paddingHorizontalSmall]}
          subContainerStyle={[appStyles.paddingVerticalZero]}
          //rowContainerStyle={[appStyles.alignItemsCenter]}
          //subRowContainerStyle={[appStyles.alignItemsCenter]}
          titleStyle={[appStyles.h6, appStyles.fontBold, appStyles.textColor3]}
          rightBottom={
            <>
              <Spacer isTiny />
              <Wrapper flexDirectionRow alignItemsCenter>
                <Ratings.Primary
                  value={rating}
                  iconSize={totalSize(2)}
                />
                <Spacer isTiny horizontal />
                <Text isSmall isTextColor2>{`${rating}(${reviews_count})`}</Text>
              </Wrapper>
            </>
          }
        />
        <Spacer isBasic />
        <Lines.Horizontal style={[appStyles.marginHorizontalSmall]} />
        <Spacer isDoubleBase />
        <Wrapper alignItemsCenter>
          <Ratings.Primary
            value={productRating}
            onPressIcon={(v) => setProductRating(v)}
            iconSize={totalSize(5)}
          />
        </Wrapper>
        <Spacer isDoubleBase />
        <TextInputs.Underlined
          titleStatic={'Write a review'}
          inputStyle={{ height: height(20), textAlignVertical: 'top', marginVertical: sizes.marginVertical / 2 }}
          multiline
          value='Duis porta, ligula rhoncus euismod pretium, nisi tellus eleifend odio, luctus viverra sem dolor id sem. Maecenas a venenatis enim, quis porttitor magna. Etiam nec rhoncus neque. Sed quis ultrices eros.'
        />
        <Spacer isDoubleBase />
        <Wrapper marginHorizontalSmall>
          <Buttons.Colored
            text={'Post Review'}
          />
          <Spacer isBasic />
          <Buttons.Bordered
            text={'Remind Me Later'}
          />
        </Wrapper>
        <Spacer isDoubleBase />

      </ScrollViews.WithKeyboardAvoidingView>
    </Wrapper>
  )
}
