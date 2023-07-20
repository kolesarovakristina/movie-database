import { FC } from 'react';
import { Tooltip, notification } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';

import { COLORS } from 'constants/colors';
import { ENotificationEnum } from 'enums/NotificationEnum';
import { ETooltipEnum } from 'enums/TooltipEnum';

type TFavoriteIconProps = {
  isMovieAddedToFavorite: boolean;
  addToFavorites: () => void;
  removeFromFavorites: () => void;
};

const starIconStyles = { fontSize: '4rem', color: COLORS.YELLOW };

const FavoriteIcon: FC<TFavoriteIconProps> = ({
  isMovieAddedToFavorite,
  addToFavorites,
  removeFromFavorites,
}) => {
  const [api, contextHolder] = notification.useNotification();

  const handleRemoveFromFavoritesClick = () => {
    removeFromFavorites();

    api.open({
      message: ENotificationEnum.REMOVE_MESSAGE,
      duration: 2,
      type: ENotificationEnum.TYPE_WARNING,
    });
  };

  const handleAddToFavoritesClick = () => {
    addToFavorites();

    api.open({
      message: ENotificationEnum.ADD_MESSAGE,
      duration: 2,
      type: ENotificationEnum.TYPE_SUCCESS,
    });
  };

  return (
    <>
      {contextHolder}

      {isMovieAddedToFavorite ? (
        <Tooltip title={ETooltipEnum.REMOVE_FAVORITES_TOOLTIP}>
          <StarFilled
            style={starIconStyles}
            onClick={handleRemoveFromFavoritesClick}
          />
        </Tooltip>
      ) : (
        <Tooltip title={ETooltipEnum.ADD_FAVORITES_TOOLTIP}>
          <StarOutlined
            style={starIconStyles}
            onClick={handleAddToFavoritesClick}
          />
        </Tooltip>
      )}
    </>
  );
};
export default FavoriteIcon;
