import Colors from './Colors';

export const FONT_FAMILY = {
  poppinsBold: 'Poppins-Bold',
  poppinsSemiBold: 'Poppins-SemiBold',
  poppinsRegular: 'Poppins-Regular',
  interRegular: 'Inter-Regular',
  interMedium: 'Inter-Medium',
  interSemiBold: 'Inter-SemiBold',
};

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
};

export const LINE_HEIGHT = {
  xs: 18,
  sm: 21,
  md: 24,
  lg: 27,
  xl: 30,
  xxl: 36,
  xxxl: 45,
};

export const FONT_WEIGHT = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
};

export default {
  // Headings
  heading1: {
    fontFamily: FONT_FAMILY.poppinsBold,
    fontSize: FONT_SIZE.xxxl,
    lineHeight: LINE_HEIGHT.xxxl,
    color: Colors.light.text,
  },
  heading2: {
    fontFamily: FONT_FAMILY.poppinsSemiBold,
    fontSize: FONT_SIZE.xxl,
    lineHeight: LINE_HEIGHT.xxl,
    color: Colors.light.text,
  },
  heading3: {
    fontFamily: FONT_FAMILY.poppinsSemiBold,
    fontSize: FONT_SIZE.xl,
    lineHeight: LINE_HEIGHT.xl,
    color: Colors.light.text,
  },
  heading4: {
    fontFamily: FONT_FAMILY.poppinsSemiBold,
    fontSize: FONT_SIZE.lg,
    lineHeight: LINE_HEIGHT.lg,
    color: Colors.light.text,
  },
  // Body text
  body: {
    fontFamily: FONT_FAMILY.interRegular,
    fontSize: FONT_SIZE.md,
    lineHeight: LINE_HEIGHT.md,
    color: Colors.light.text,
  },
  bodyMedium: {
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: FONT_SIZE.md,
    lineHeight: LINE_HEIGHT.md,
    color: Colors.light.text,
  },
  bodySmall: {
    fontFamily: FONT_FAMILY.interRegular,
    fontSize: FONT_SIZE.sm,
    lineHeight: LINE_HEIGHT.sm,
    color: Colors.light.text,
  },
  // Button text
  button: {
    fontFamily: FONT_FAMILY.interSemiBold,
    fontSize: FONT_SIZE.md,
    lineHeight: LINE_HEIGHT.md,
    color: Colors.light.text,
  },
  buttonSmall: {
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: FONT_SIZE.sm,
    lineHeight: LINE_HEIGHT.sm,
    color: Colors.light.text,
  },
  // Caption text
  caption: {
    fontFamily: FONT_FAMILY.interRegular,
    fontSize: FONT_SIZE.xs,
    lineHeight: LINE_HEIGHT.xs,
    color: Colors.light.text,
  },
};