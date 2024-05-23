import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';



const FeatureList = [
  {
    title: 'Developer Guides',
    icon: '<FaFileCode/>',
    link: '/docs/intro',
    description: (
      <>
        A comprehensive guide covering essentials, in-depth content, and integrations.
      </>
    ),
  },
  {
    title: 'Developer Tutorials',
    icon: '<FaChalkboardTeacher/>',
    link: '/docs/category/tutorials',
    description: (
      <>
        Read practical tutorials for every level written by Eyer experts.
      </>
    ),
  },
  {
    title: 'References',
    icon: '<FaChalkboardTeacher/>',
    link: '/docs/category/references',
    description: (
      <>
        Deepen your understanding of Eyer, from explanation of key concepts to API references.
      </>
    ),
  },
  {
    title: 'Troubleshooting & Support',
    icon: '<FaChalkboardTeacher/>',
    link: '/docs/troubleshooting-and-support',
    description: (
      <>
        Get the assistance you need with our dedicated support services.
      </>
    ),
  },
];

function Feature({Svg, icon, title, link, description}) {
  return (
    <div className='newBox'>
      <Link to= {link} className='page-link'> 
        <div className="text--center"> 
          <div className='title-text'>
            <Heading as="h3">{title}</Heading>
          </div>
        </div>
        <div className="text--center padding-horiz--md">
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className='guides'>
        <div className='guides-container'>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
