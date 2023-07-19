import { FC } from 'react';
import { Tooltip, notification } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { COLORS } from 'constants/colors';

type TFavoriteIconProps = {
  isMovieAddedToFavorite: boolean;
  addToFavorites: () => void;
  removeFromFavorites: () => void;
};

enum EIconMessageEnum {
  ADD_MESSAGE = 'Movie was succesfully added to favorites',
  REMOVE_MESSAGE = 'Movie was succesfully removed from favorites',
}

const FavoriteIcon: FC<TFavoriteIconProps> = ({
  isMovieAddedToFavorite,
  addToFavorites,
  removeFromFavorites,
}) => {
  const [api, contextHolder] = notification.useNotification();

  const handleRemoveFromFavoritesClick = () => {
    removeFromFavorites();

    api.open({
      message: EIconMessageEnum.REMOVE_MESSAGE,
      duration: 2,
      type: 'warning',
    });
  };

  const handleAddToFavoritesClick = () => {
    addToFavorites();

    api.open({
      message: EIconMessageEnum.ADD_MESSAGE,
      duration: 2,
      type: 'success',
    });
  };

  return (
    <>
      {contextHolder}

      {isMovieAddedToFavorite ? (
        <Tooltip title="Remove from favorites">
          <StarFilled
            style={{ fontSize: '4rem', color: COLORS.YELLOW }}
            onClick={handleRemoveFromFavoritesClick}
          />
        </Tooltip>
      ) : (
        <Tooltip title="Add to favorites">
          <StarOutlined
            style={{ fontSize: '4rem', color: COLORS.YELLOW }}
            onClick={handleAddToFavoritesClick}
          />
        </Tooltip>
      )}
    </>
  );
};
export default FavoriteIcon;
