import { useState, useEffect, FC, MouseEvent } from 'react';
import * as Styled from './styled';
import PhotoAdd, { IPhotoAddProps } from '../CreateBanner/PhotoAdd';
import 'moment/locale/ru';
import Rating from '../../ui/Rating';
import {
  favoritesInStorage,
  inStorage,
} from '../../../utils/favoritesInStorage.js';
import { PHOTO_URL } from '../../../api/variables';
import HeartFullFill from '../../pages/MainPage/components/Header/icons/HeartFullFill';
import { IProfileType } from '../Cabinet/components/CabinetSales';
import { IEducation } from 'src/types/education';
import {
  IEntityDeleteHandler,
  IEntityHandler,
} from '../Cabinet/components/ActiveProfile/ProfileManager';
import { DeleteIcon } from '../Sale/styled';
import Link from 'next/link';
import { formatDateRangeWithTime } from '@/utils/formatDateRangeWithTime';

interface IEducationProps extends Partial<Omit<IPhotoAddProps, 'hover'>> {
  create?: boolean;
  type?: IProfileType;
  item: IEducation;
  handleClick?: IEntityHandler;
  handleDelete?: IEntityDeleteHandler;
  noHover?: boolean;
  cabinet?: boolean;
}

const Education: FC<IEducationProps> = ({
  create = false,
  noHover = false,
  type,
  item,
  setPhoto,
  photo,
  handleClick,
  handleDelete,
  cabinet,
}) => {
  const [hover, setHover] = useState(false);
  const [isFavorite, setIsFavorit] = useState(false);
  const [imageHover, setImageHover] = useState(false);

  const photoSrc = `${PHOTO_URL}${item?.cover?.url ?? photo?.url ?? ''}`;

  useEffect(() => {
    if (!create) {
      const isInStorage = inStorage('educations', {
        id: item.id,
        title: item.title,
      });
      setIsFavorit(!!isInStorage);
    }
  }, [item]);

  const addFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    favoritesInStorage('educations', {
      id: item.id,
      title: item.title,
    });
    setIsFavorit(!isFavorite);
  };

  const dateText = formatDateRangeWithTime(
    item.dateStart,
    item.dateEnd,
    item.timeStart,
    item.timeEnd,
  );

  const renderContent = () => (
    <>
      {!create ? (
        <Styled.EducationTop
          isDeleted={item.deleted}
          imageHover={imageHover}
          onMouseOver={() => !noHover && setImageHover(true)}
          onMouseLeave={() => setImageHover(false)}
        >
          {photoSrc && <Styled.Image alt="photo" src={photoSrc} />}
          {cabinet ? (
            <DeleteIcon
              visible={imageHover}
              id={item.id}
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                handleDelete && handleDelete(item.id, !item.publishedAt);
              }}
            />
          ) : (
            <Styled.Favorite onClick={addFavorite}>
              <HeartFullFill fill={isFavorite} />
            </Styled.Favorite>
          )}
        </Styled.EducationTop>
      ) : (
        <Styled.EducationTop
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {setPhoto && (
            <PhotoAdd photo={photo || null} setPhoto={setPhoto} hover={hover} />
          )}
        </Styled.EducationTop>
      )}
      <Styled.EducationContent>
        <div>
          {/* <EducationName>{name}</EducationName> */}
          <Styled.EducationTitle>{item.title}</Styled.EducationTitle>
        </div>
        <Styled.EducationBottom>
          {dateText && (
            <Styled.EducationData>
              <Styled.Date>
                {dateText.split('\n').map((str, i) => (
                  <span key={i}>
                    {str}
                    <br />
                  </span>
                ))}
              </Styled.Date>
            </Styled.EducationData>
          )}
          {item.amount ? (
            <Styled.Promo>
              <Styled.PromoText>Стоимость</Styled.PromoText>
              <Styled.PromoText>{item.amount}</Styled.PromoText>
            </Styled.Promo>
          ) : null}
        </Styled.EducationBottom>
        <Rating position="start" rating={item.averageScore} />
      </Styled.EducationContent>
    </>
  );

  return (
    <Styled.EducationWrap
      id={item.id}
      onClick={handleClick}
      onKeyDown={e => e.key === 'Enter' && handleClick?.(e)}
      role="article"
      tabIndex={0}
    >
      {item.publishedAt ? (
        <Link shallow href={'/educations/' + item.id}>
          {renderContent()}
        </Link>
      ) : (
        renderContent()
      )}
    </Styled.EducationWrap>
  );
};

export default Education;
