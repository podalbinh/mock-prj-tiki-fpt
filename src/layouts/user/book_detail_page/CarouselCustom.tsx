import {Carousel} from "antd";

const CustomPrev = (props: any) => (
    <div
        {...props}
        style={{
            ...props.style,
            background: '#ffffff',      // nền trắng
            // borderRadius: '50%',        // tròn
            // width: 40,
            // height: 40,
            // display: 'flex',            // flex để căn giữa
            // justifyContent: 'center',
            // alignItems: 'center',
            // boxShadow: '0 2px 8px rgba(0,0,0,0.15)', // optional: shadow
            color: '#0A68FF',           // màu icon
            zIndex: 10,
        }}
    >
    </div>
);

const CustomNext = (props: any) => (
    <div
        {...props}
        style={{
            ...props.style,
            background: '#ffffff',
            // borderRadius: '50%',
            // paddingBlock: '10px',
            // textAlign: 'center',
            // width: 32,
            // height: 32,
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            // boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            color: '#0A68FF',
            zIndex: 10,
        }}
    >
    </div>
);


interface CarouselCustomProps {
    children: React.ReactNode[];
    itemsPerSlide?: number; // số item trên 1 slide
}

export function CarouselCustom({ children, itemsPerSlide = 4 }: CarouselCustomProps) {
    const slides: React.ReactNode[][] = [];

    for (let i = 0; i < children.length; i += itemsPerSlide) {
        slides.push(children.slice(i, i + itemsPerSlide));
    }

    return (
        <Carousel
            arrows
            infinite={false}
            dots={true}
            prevArrow={<CustomPrev />}
            nextArrow={<CustomNext />}
        >
            {slides.map((group, idx) => (
                <div key={idx}>
                    <div className="grid grid-cols-4">{group}</div>
                </div>
            ))}
        </Carousel>
    );
}


