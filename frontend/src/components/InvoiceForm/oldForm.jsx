<form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
<div className="flex flex-col gap-8">
  <section className="flex flex-col gap-4">
    <h4>Bill From</h4>
    <div className="flex flex-col gap-4">
      <FormItem>
        <label htmlFor="senderStreet">Sender Street</label>
        <input
          {...register("senderStreet")}
          className={"primary-bg rounded-md border py-2 px-4"}
        />
      </FormItem>

      <FormItem>
        <label htmlFor="senderCity">Sender City</label>
        <input
          defaultValue={formData["senderCity"]}
          {...register("senderCity")}
          className={"primary-bg rounded-md border py-2 px-4"}
        />
      </FormItem>

      <FormItem>
        <label htmlFor="senderPostCode">Sender Postcode</label>
        <input
          name="senderPostCode"
          type="text"
          {...register("senderPostCode", { required: true })}
        />
      </FormItem>

      <FormItem>
        <label htmlFor="senderCountry">Sender Country</label>
        <input
          {...register("senderCountry")}
          className={"primary-bg rounded-md border py-2 px-4"}
        />
      </FormItem>
    </div>
  </section>

  <div>
    <h4>Bill To</h4>
    <section className="flex flex-col gap-4">
      <FormItem>
        <label htmlFor="clientName">Client Name</label>
        <input
          defaultValue={formData["clientName"]}
          {...register("clientName")}
          className={"primary-bg rounded-md border py-2 px-4"}
        />
      </FormItem>
      <FormItem>
        <label htmlFor="clientEmail">Client Email</label>
        <input
          defaultValue={formData["clientEmail"]}
          {...register("clientEmail")}
          className={"primary-bg rounded-md border py-2 px-4"}
        />
      </FormItem>
      <FormItem>
        <label htmlFor="clientStreet">Client Street</label>
        <input
          defaultValue={formData["clientStreet"]}
          {...register("clientStreet")}
          className={"primary-bg rounded-md border py-2 px-4"}
        />
      </FormItem>
      <FormItem>
        <label htmlFor="clientCity">Client City</label>
        <input
          defaultValue={formData["clientCity"]}
          {...register("clientCity")}
          className={"primary-bg rounded-md border py-2 px-4"}
        />
      </FormItem>
      <FormItem>
        <label htmlFor="clientPostCode">Client Postcode</label>
        <input
          defaultValue={formData["clientPostCode"]}
          {...register("clientPostCode")}
          className={"primary-bg rounded-md border py-2 px-4"}
        />
      </FormItem>
      <FormItem>
        <label htmlFor="clientCountry">Client Country</label>
        <input
          defaultValue={formData["clientCountry"]}
          {...register("clientCountry")}
          className={"primary-bg rounded-md border py-2 px-4"}
        />
      </FormItem>
      <FormItem>
        <label htmlFor="description">Project/Description</label>
        <input
          defaultValue={formData["description"]}
          {...register("description")}
          className={"primary-bg rounded-md border py-2 px-4"}
        />
      </FormItem>

      {/* Select payment terms */}
      {/* <SelectPaymentTerms /> */}
    </section>
  </div>
</div>

{/* <FormItems itemsArray={itemsArray} setItemsArray={setItemsArray} /> */}

<div className="flex gap-2">
  <button onClick={handleCancel}>Cancel</button>
  <button type="submit">Save Changes</button>
</div>
</form>