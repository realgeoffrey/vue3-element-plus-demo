<script lang="jsx">
import JsxSon from './JsxSon.vue'
export default {
  components: {
    JsxSon,
  },
  setup() {
    return () => {
      return <JsxSon
        on={{
          'd-d': () => 'd-d',
          dC: () => 'dC',
        }}
        on-e={() => 'e'}
        on-e-e={() => 'e-e'}
        onF={() => 'F'}
        onFe={() => 'Fe'}
        onFe-e={() => 'Fe-e'}

        b='b'
        bB='bB'
        b-B='b-B'
        cc={'cc'}
        cC={'cC'}
        c-C={'c-C'}
        c-c={'c-c'}

        {...{
          attrs: { id: "fooo1", id2: "fooo1", id3: "fooo1", id4: "fooo1" },
        }}
        attrs={{ id: "fooo2", id2: "fooo2", }}
        id={"fooo3"}
        {...{ attrs: { id4: "fooo4" } }}


        {...{ props: { props1: 'fooo1', props2: 'fooo1', props3: 'fooo1', props4: 'fooo1' } }}
        props={{ props1: 'fooo2', props2: 'fooo2', props3: 'fooo2' }}
        props1={'fooo3'}
        {...{ props: { props2: 'fooo4', } }}
      />
    }
  },
}
</script>
