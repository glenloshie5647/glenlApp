import React, { useRef, useEffect } from 'react';
import classnames from 'classnames';

import {
  BackgroundColor,
  BorderRadius,
  BlockSize,
  Display,
  JustifyContent,
  AlignItems,
  FlexDirection
} from '../../../helpers/constants/design-system';

import { Box, BoxProps } from '../box';
import type { PolymorphicRef } from '../box';
import { useModalContext } from '../modal/modal.context';
import { ModalFocus } from '../modal-focus';
import {
  ModalContentProps,
  ModalContentSize,
  ModalContentComponent
} from './modal-content.types';

export const ModalContent: ModalContentComponent = React.forwardRef(
<C extends React.ElementType = 'div'>(
{
className = '',
children,
size = ModalContentSize.Sm,
modalDialogProps = {},
...props
}: ModalContentProps<C>,
ref?: PolymorphicRef<C>
) => {
const modalContext = useModalContext();
const modalDialogRef = useRef<HTMLElement>(null);

useEffect(() => {
const handleEscKey = (event: KeyboardEvent) => {
if (modalContext.isClosedOnEscapeKey && event.key === 'Escape') modalContext.onClose();
};
const handleClickOutside = (event: MouseEvent) => {
if (!(event.target as HTMLElement).closest('.mm-popover') &&
    modalContext.isClosedOnOutsideClick &&
    modalDialogRef.current &&
    !modalDialogRef.current.contains(event.target as Node)) 
{
    modalContext.onClose();
}
};

document.addEventListener('keydown', handleEscKey);
document.addEventListener('mousedown', handleClickOutside);
return () => {
document.removeEventListener('keydown', handleEscKey);
document.removeEventListener('mousedown', handleClickOutside);
};
}, [modalContext]);

return (
<ModalFocus {...{
initialFocusRef: modalContext.initialFocusRef, 
finalFocusRef: modalContext.finalFocusRef, 
restoreFocus: modalContext.restoreFocus, 
autoFocus: modalContext.autoFocus
}}>
<Box
className={classnames('mm-modal-content', className)}
ref={ref}
display={Display.Flex}
width={BlockSize.Screen}
height={BlockSize.Screen}
justifyContent={JustifyContent.center}
alignItems={AlignItems.flexStart}
paddingRight={4}
paddingLeft={4}
paddingTop={[4,8,12]}
paddingBottom={[4,8,12]}
{...(props as BoxProps)}
>
<Box
as="section"
role="dialog"
aria-modal="true"
backgroundColor={BackgroundColor.backgroundDefault}
borderRadius={BorderRadius.LG}
width={'full'}
display={'flex'}
flexDirection={'column'}
paddingTop={'16px'}
paddingBottom={'16px'}
ref={(el) => el && (modalDialogRef.current=el)}
{...modalDialogProps}
className={
classnames(
'mm-modal-content__dialog',
`mm-modal-content__dialog--size-${size}`)
}>
{children}</Box></Box></ModalFocus>);});
