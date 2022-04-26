import DummyIntegratee from './dummy-integratee';
import { PluginManager } from 'live-plugin-manager';

const pluginsToLoad = [DummyIntegratee];

const load = async () => {
  const manager = new PluginManager({});

  await Promise.all(
    pluginsToLoad.map(async (item) => {
      console.log(`installing ${item.registry}`);
    })
  );

  console.log(`done`);
};

export default load;
