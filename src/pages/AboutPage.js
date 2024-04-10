import React from "react";

const AboutPage = () => {
  return (
    <section className="bg-white text-black">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          About Pomodoro Plus
        </h1>
        <p className="text-md md:text-lg mb-6">
          Pomodoro Plus is dedicated to enhancing productivity and focus through
          the Pomodoro Technique. Our application helps users manage their time
          effectively, ensuring they can concentrate on work and take breaks
          systematically to boost overall efficiency and well-being.
        </p>
        <p className="text-md md:text-lg mb-6">
          Made in collaboration for CS370, our mission has been to provide a
          user-friendly platform that supports individuals in achieving their
          daily work and study goals. We believe in creating a balance between
          work and rest, enabling our users to achieve optimum performance
          without burnout.
        </p>
        <p className="text-md md:text-lg">
          We continually evolve our application based on user feedback and the
          latest research in productivity and time management.
        </p>
        <div className="mt-8">
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
