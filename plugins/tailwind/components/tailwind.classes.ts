import {classes as background} from "@/components/tailwind-classes/background.classes";
import {classes as base} from "@/components/tailwind-classes/base.classes";
import {classes as border} from "@/components/tailwind-classes/border.classes";
import {classes as display} from "@/components/tailwind-classes/display.classes";
import {classes as flex} from "@/components/tailwind-classes/flex.classes";
import {classes as grid} from "@/components/tailwind-classes/grid.classes";
import {classes as height} from "@/components/tailwind-classes/height.classes";
import {classes as width} from "@/components/tailwind-classes/width.classes";
import {classes as marginPadding} from "@/components/tailwind-classes/mp.classes";
import {classes as overflow} from "@/components/tailwind-classes/overflow.classes";
import {classes as position} from "@/components/tailwind-classes/position.classes";
import {classes as text} from "@/components/tailwind-classes/text.classes";
import {classes as topRightLeftBottom} from "@/components/tailwind-classes/trlb.classes";

const all = [...background, ...base, ...border, ...display, ...flex, ...grid, ...height, ...width, ...marginPadding, ...overflow, ...position, ...text, ...topRightLeftBottom] as { className: string; rules: string }[];

export const tailwind: { classes: any; all: { className: string; rules: string }[] } = {
    classes: {
        background,
        base,
        border,
        display,
        flex,
        grid,
        width,
        height,
        marginPadding,
        overflow,
        position,
        text,
        topRightLeftBottom
    },
    all
}