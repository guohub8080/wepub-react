import { CSSProperties } from "react";
import { isArray, isUndefined, isString } from "lodash";

interface EachMentionProps {
    title: string;
    name?: string | string[];
    titleUnderColor: string;
    titleColor: string;
}

const OneTitle = (props: { name: string }) => (
    <section style={oneTitleStyle}>
        {props.name}
    </section>
);

const EachMention = (props: EachMentionProps) => {
    const letterSpacing = 2;

    const titleSectionStyle: CSSProperties = {
        display: "inline-block",
        textAlign: "center",
        height: 22,
        fontSize: 15,
        fontWeight: 700,
        paddingLeft: 16,
        paddingRight: 16,
        borderBottom: `10px ${props.titleUnderColor} solid`,
        letterSpacing: letterSpacing,
        color: props.titleColor,
    };

    return (
        <section style={containerStyle}>
            <section style={titleSectionStyle}>
                {props.title}
            </section>
            {isUndefined(props.name) && <OneTitle name={"商务部经济合作局"} />}
            {isString(props.name) && <OneTitle name={props.name} />}
            {isArray(props.name) && props.name.map((x: string, y: number) => (
                <OneTitle key={y} name={x} />
            ))}
        </section>
    );
};

// =============================================== styles ===============================================
const containerStyle: CSSProperties = {
    marginBottom: 25,
    textAlign: "center"
}

const oneTitleStyle: CSSProperties = {
    textAlign: "center",
    fontSize: 14,
    marginTop: 5,
    color: "#616161",
    wordBreak: "break-all",
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
    lineHeight: 1.3
}

export default EachMention;

