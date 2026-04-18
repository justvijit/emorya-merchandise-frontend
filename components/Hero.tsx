import Image from "next/image";

const Hero = () => {
  return (
    <section className="hero ">
      <div className="hero-container">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="hero-title">
            Design Your <br />
            <span>Own Style</span>
          </h1>

          <p className="hero-text">
            Create custom apparel with our drag-and-drop designer.
            Premium quality meets personalization.
          </p>

          <div className="hero-buttons">
            <button className="btn-pink">
              SHOP NOW
            </button>

            <button className="btn-blue">
              START CUSTOMIZING
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-image">
          <Image
            src="/hero.jpg"
            alt="Hero"
            fill
            priority
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;